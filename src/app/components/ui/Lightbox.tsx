'use client';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images?: string[];
  title?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const MotionImage = motion.create(Image);
MotionImage.displayName = 'MotionImage';

// Limites de Zoom
const MIN_SCALE = 1;
const MAX_SCALE = 3.5; // Aumentado um pouco o limite de zoom

export function Lightbox({
  isOpen,
  onClose,
  images = [],
  title,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: LightboxProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [scale, setScale] = useState(1); // Estado de Zoom independente

  const currentIndex = page;
  const currentImage = images[currentIndex];

  const handleClose = useCallback(() => {
    setPage([0, 0]);
    setScale(1); // Reseta o zoom ao fechar
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !images[currentIndex + 1]) return;
    const preloaded = new window.Image();
    preloaded.src = images[currentIndex + 1];
    return () => {
      preloaded.onload = null;
      preloaded.onerror = null;
      preloaded.src = '';
    };
  }, [currentIndex, images, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = useCallback(
    (newDirection: number) => {
      setScale(1); // Reseta o zoom ao trocar de imagem para evitar bugs
      const isNext = newDirection === 1;
      if (isNext) {
        if (currentIndex < images.length - 1) setPage([currentIndex + 1, 1]);
        else if (hasNext && onNext) {
          setPage([0, 1]);
          onNext();
        }
      } else {
        if (currentIndex > 0) setPage([currentIndex - 1, -1]);
        else if (hasPrev && onPrev) {
          setPage([0, -1]);
          onPrev();
        }
      }
    },
    [currentIndex, images.length, hasNext, hasPrev, onNext, onPrev]
  );

  // Ações de Zoom
  const zoomIn = useCallback(
    () => setScale((s) => Math.min(MAX_SCALE, s + 0.5)),
    []
  );
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(MIN_SCALE, s - 0.5)),
    []
  );
  const toggleZoom = useCallback(
    () => setScale((s) => (s > 1 ? MIN_SCALE : 2.5)),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, isOpen, navigate, zoomIn, zoomOut]);

  if (!isOpen || !currentImage) return null;

  const handleBackdropPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Variantes AGORA APENAS PARA O WRAPPER INVISÍVEL (Resolve o bug do voo pro lado)
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30, restDelta: 0.5 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { opacity: { duration: 0.15 } },
    }),
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-colors"
      onPointerDown={handleBackdropPointerDown}
    >
      {/* Barra de Controles Aumentada (Top Direito) */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-130 flex items-center gap-3 md:gap-5">
        {/* Pílula de Zoom Mais Gordinha */}
        <div className="flex items-center bg-white/10 rounded-full p-1.5 md:p-2 border border-white/10 backdrop-blur-md shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
            disabled={scale <= MIN_SCALE}
            className="p-3 text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Afastar"
          >
            <ZoomOut size={24} className="md:w-6 md:h-6" />
          </button>

          <span className="text-white/90 text-sm md:text-base w-14 md:w-16 text-center font-bold tracking-wider cursor-default select-none">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
            disabled={scale >= MAX_SCALE}
            className="p-3 text-white hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Aproximar"
          >
            <ZoomIn size={24} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Botão Fechar Gigante */}
        <button
          onClick={handleClose}
          className="p-4 text-white bg-white/10 hover:bg-white/30 rounded-full transition-all active:scale-90 border border-white/10 backdrop-blur-md shadow-lg"
          aria-label="Fechar"
          type="button"
        >
          <X size={28} strokeWidth={2.5} className="md:w-8 md:h-8" />
        </button>
      </div>

      <NavButton
        direction="left"
        onClick={() => navigate(-1)}
        visible={currentIndex > 0 || hasPrev}
      />
      <NavButton
        direction="right"
        onClick={() => navigate(1)}
        visible={currentIndex < images.length - 1 || hasNext}
      />

      <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {/* WRAPPER: Apenas Desliza */}
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* IMAGEM: Apenas faz Zoom e Arrasto (Pan) */}
            <MotionImage
              src={currentImage}
              alt={title ?? 'Imagem ampliada'}
              fill
              sizes="(min-width: 1024px) 1024px, 95vw"
              className={`object-contain shadow-2xl select-none transform-gpu active:cursor-grabbing ${
                scale > 1 ? 'cursor-grab' : 'cursor-pointer'
              }`}
              priority
              onPointerDown={(e) => e.stopPropagation()}
              onDoubleClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              // MÁGICA AQUI: Quando scale é 1, ele reseta o X e Y suavemente. Quando é maior, ele solta.
              animate={
                scale === 1 ? { scale: 1, x: 0, y: 0 } : { scale: scale }
              }
              transition={{ duration: 0.3, ease: 'easeOut' }}
              drag={scale > 1 ? true : 'x'}
              dragConstraints={scale > 1 ? undefined : { left: 0, right: 0 }}
              dragElastic={scale > 1 ? 0 : 1}
              onDragEnd={(_, { offset, velocity }) => {
                // Se estivermos com zoom ativado, bloqueia a troca de foto para podermos passear pela imagem
                if (scale > 1) return;

                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) navigate(1);
                else if (swipe > swipeConfidenceThreshold) navigate(-1);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="z-120 mt-6 pointer-events-none flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage + 'info'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            {images.length > 1 && (
              <span className="px-5 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white font-bold text-[11px] tracking-widest uppercase shadow-md">
                {currentIndex + 1} / {images.length}
              </span>
            )}
            {title && (
              <p className="mt-4 text-stone-200 font-medium text-lg text-center px-6 drop-shadow-lg">
                {title}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const NavButton = memo(
  ({
    direction,
    onClick,
    visible,
  }: {
    direction: 'left' | 'right';
    onClick: () => void;
    visible: boolean;
  }) => {
    if (!visible) return null;
    const isLeft = direction === 'left';
    return (
      <button
        type="button"
        onPointerDown={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={isLeft ? 'Imagem anterior' : 'Próxima imagem'}
        className={`hidden md:flex absolute ${
          isLeft ? 'left-0' : 'right-0'
        } inset-y-0 w-1/6 z-110 group items-center ${
          isLeft ? 'justify-start pl-8' : 'justify-end pr-8'
        }`}
      >
        {/* Botões das setas agora são Maiores e mais Visíveis */}
        <span className="p-4 text-white bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/30 group-hover:scale-110 rounded-full transition-all duration-300 shadow-xl">
          {isLeft ? (
            <ChevronLeft size={44} strokeWidth={2} />
          ) : (
            <ChevronRight size={44} strokeWidth={2} />
          )}
        </span>
      </button>
    );
  }
);

NavButton.displayName = 'NavButton';
