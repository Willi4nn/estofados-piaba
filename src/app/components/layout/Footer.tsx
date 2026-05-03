'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';
import { SiFacebook, SiInstagram } from 'react-icons/si';

export function Footer() {
  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre', href: '#about' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/estofados_piaba/',
      icon: <SiInstagram size={20} aria-hidden="true" />,
      'aria-label': 'Siga Estofados Piaba no Instagram',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100091404635850',
      icon: <SiFacebook size={20} aria-hidden="true" />,
      'aria-label': 'Siga Estofados Piaba no Facebook',
    },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Fundo alterado para bg-secondary-950
    <footer className="bg-secondary-950 text-white pt-20 pb-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-500/30 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-16 md:gap-8 mb-12">
          <div className="md:col-span-5 flex flex-col items-start">
            <h4 className="font-serif text-3xl md:text-4xl text-white mb-6">
              A Arte de Ressignificar o Conforto.
            </h4>
            <p className="text-white/70 font-light leading-relaxed max-w-sm text-pretty mb-8">
              Desde 1979, dedicamos nossa paixão à restauração e criação de
              estofados que transcendem o tempo, unindo técnicas tradicionais ao
              design contemporâneo em Patos de Minas.
            </p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-primary-500 hover:text-primary-50 transition-colors duration-300 cursor-pointer"
            >
              Voltar ao Topo
              <span className="p-2 rounded-full bg-white/10 group-hover:bg-primary-500 transition-colors duration-300">
                <ArrowUpRight
                  size={14}
                  className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-white"
                />
              </span>
            </button>
          </div>

          <div className="flex flex-row gap-12 md:gap-16">
            <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">
                Navegação
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/80 hover:text-white transition-colors duration-300 w-fit relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-primary-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">
                Social
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link['aria-label']}
                  className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 w-fit"
                >
                  <span className="text-primary-500 group-hover:text-white transition-colors">
                    {link.icon}
                  </span>
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-primary-500 hover:after:w-full after:transition-all after:duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border-t border-white/10 flex flex-col items-center py-6 mt-4"
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-white/50">
            <p>© {new Date().getFullYear()} Estofados Piaba.</p>
            <p>Todos os direitos reservados.</p>
            <p className="flex items-center gap-2">
              Desenvolvido por Willian Pereira
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
