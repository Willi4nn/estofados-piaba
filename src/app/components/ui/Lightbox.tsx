'use client';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

// 1. Variantes movidas para fora e tipadas para evitar recálculos
// Usamos transformações simples (x e scale) que são executadas na GPU
const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '20%' : '-20%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30, restDelta: 0.5 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '20%' : '-20%',
    opacity: 0,
    scale: 0.95,
    transition: { opacity: { duration: 0.15 } },
  }),
};

const MotionImage = motion.create(Image);

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
  const currentIndex = page;
  const currentImage = images[currentIndex];

  const handleClose = useCallback(() => {
    setPage([0, 0]);
    onClose();
  }, [onClose]);

  // Preload next image
  useEffect(() => {
    if (isOpen && images[currentIndex + 1]) {
      const preloaded = new window.Image();
      preloaded.src = images[currentIndex + 1];
    }
  }, [currentIndex, images, isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const navigate = useCallback(
    (newDirection: number) => {
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, isOpen, navigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden transition-colors"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-3 z-130 text-white bg-white/5 hover:bg-white/10 rounded-full transition-transform active:scale-90"
        aria-label="Fechar"
        type="button"
      >
        <X size={24} />
      </button>

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

      <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <MotionImage
            key={currentImage}
            src={currentImage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            alt={title ?? 'Imagem ampliada'}
            fill
            sizes="(min-width: 1024px) 1024px, 95vw"
            className="object-contain shadow-2xl select-none pointer-events-none will-change-transform transform-gpu"
            priority
          />
        </AnimatePresence>
      </div>

      <div className="z-120 mt-8 pointer-events-none flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage + 'info'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            {images.length > 1 && (
              <span className="px-3 py-1 bg-white/5 rounded-full text-white/50 text-[10px] tracking-tighter">
                {currentIndex + 1} / {images.length}
              </span>
            )}
            {title && (
              <p className="mt-4 text-stone-300 font-light text-base text-center px-6">
                {title}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// 4. Memoização: Evita que os botões re-renderizem durante a animação da imagem
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
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={isLeft ? 'Imagem anterior' : 'Próxima imagem'}
        className={`absolute ${isLeft ? 'left-0' : 'right-0'} inset-y-0 w-1/6 z-110 group flex items-center ${isLeft ? 'justify-start pl-6' : 'justify-end pr-6'}`}
      >
        <span className="p-3 text-white bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-300">
          {isLeft ? (
            <ChevronLeft size={40} strokeWidth={1} />
          ) : (
            <ChevronRight size={40} strokeWidth={1} />
          )}
        </span>
      </button>
    );
  }
);

NavButton.displayName = 'NavButton';
