'use client';

// src/app/components/sections/FAQ.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quanto custa reformar um sofá?',
    answer:
      'O valor da reforma de sofá varia conforme o tamanho (2, 3 ou 4 lugares), o modelo do sofá e o tecido escolhido, assim como os outros móveis. Oferecemos orçamento gratuito e sem compromisso. Entre em contato pelo WhatsApp para uma avaliação personalizada.',
  },
  {
    question: 'A Estofados Piaba faz retirada e entrega em domicílio?',
    answer:
      'Sim! Realizamos retirada e entrega do móvel na sua residência em Patos de Minas e região. Entre em contato pelo WhatsApp para agendar um horário conveniente para você.',
  },
  {
    question: 'Quais tipos de estofados a Estofados Piaba reforma?',
    answer:
      'Reformamos sofás, poltronas, cadeiras, cabeceiras de cama e puffs. Também fabricamos cabeceiras, camas e almofadas decorativas sob medida com os mais variados tecidos e formatos.',
  },
  {
    question: 'Quais tecidos estão disponíveis para reforma de estofados?',
    answer:
      'Trabalhamos com Linho Misto, Camurça Michigan, Veludo Londres/Ônix, Bouclé, Couro Ecológico, Pet Friendly (resistente a pelos e arranhões de pets), Acqua Block (impermeável) e Sarja Peletizada, entre outros. Solicite amostras pelo WhatsApp ou em nossa oficina!',
  },
  {
    question: 'Há quanto tempo a Estofados Piaba atua no mercado?',
    answer:
      'A Estofados Piaba está no mercado desde 1979 — mais de 45 anos de experiência em reforma e confecção de estofados em Patos de Minas-MG. Nossa tradição e reputação são nossa maior garantia de qualidade.',
  },
];

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      className="border-b border-stone-200 last:border-0"
    >
      <dt>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          type="button"
          // Correção UX: px-6 md:px-8 movido para o botão. ring-inset para o foco não cortar nas bordas.
          className="w-full flex items-center justify-between gap-6 py-5 md:py-6 px-6 md:px-8 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        >
          <h3
            itemProp="name"
            className={`font-medium text-base md:text-lg transition-colors duration-300 ${
              isOpen
                ? 'text-primary'
                : 'text-stone-800 group-hover:text-primary'
            }`}
          >
            {item.question}
          </h3>
          <span
            className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ease-out ${
              isOpen
                ? 'bg-primary border-primary rotate-45 shadow-md'
                : 'bg-white border-stone-200 group-hover:border-primary/40 group-hover:bg-stone-50'
            }`}
            aria-hidden="true"
          >
            <Plus
              className={`w-4 h-4 transition-colors duration-500 ${
                isOpen
                  ? 'text-white'
                  : 'text-stone-500 group-hover:text-primary'
              }`}
            />
          </span>
        </button>
      </dt>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.dd
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div
              itemProp="text"
              // Correção UX: pl-6 md:pl-8 para alinhar com a pergunta. pr-14 md:pr-20 para o respiro do ícone.
              className="pb-6 pl-6 md:pl-8 pr-14 md:pr-20 text-stone-600 font-light leading-relaxed text-base"
            >
              {item.answer}
            </div>
          </motion.dd>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">
            Dúvidas Frequentes
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-4xl text-stone-800"
          >
            Perguntas sobre{' '}
            <span className="italic text-primary">reforma de estofados</span>
          </h2>
        </motion.div>

        <dl
          itemScope
          itemType="https://schema.org/FAQPage"
          // Correção UX: Tiramos o padding lateral daqui e adicionamos overflow-hidden para conter os botões
          className="bg-stone-50 rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
        >
          {FAQ_ITEMS.map((item, index) => (
            <FAQAccordionItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </dl>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-stone-500 text-sm mt-10"
        >
          Ainda tem dúvidas?{' '}
          <a
            href="https://wa.me/5534997659558"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline underline-offset-4 hover:text-primary-dark transition-colors"
          >
            Fale conosco pelo WhatsApp
          </a>{' '}
          — respondemos rapidinho!
        </motion.p>
      </div>
    </section>
  );
}
