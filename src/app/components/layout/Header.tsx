'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, type MouseEvent } from 'react';
import { useScroll } from '../../hooks/useScroll';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScroll(20);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre', href: '#about' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen || isScrolled
          ? 'bg-surface/95 backdrop-blur-lg py-6 border-b border-border-light'
          : 'bg-transparent py-6'
      }`}
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Estofados Piaba - Início"
          >
            {isMobileMenuOpen || isScrolled ? (
              <Image
                src="/piaba-logo-black.png"
                alt="Logo Estofados Piaba"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            ) : (
              <Image
                src="/piaba-logo-white.png"
                alt="Logo Estofados Piaba"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            )}

            <span
              className={`font-serif text-2xl font-bold tracking-wide ${
                isMobileMenuOpen || isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              ESTOFADOS PIABA
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'relative text-[13px] uppercase tracking-widest font-medium transition-colors duration-300 py-2 group font-sans',
                  isScrolled
                    ? 'text-secondary-800 hover:text-primary-600'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full',
                    isScrolled ? 'bg-primary-500' : 'bg-white'
                  )}
                />
              </a>
            ))}

            <div className="ml-2">
              <Button
                href="#contact"
                variant={isScrolled ? 'primary' : 'outline'}
                className={
                  !isScrolled
                    ? 'border-white text-white hover:bg-white hover:text-secondary-900 px-6 py-2 h-10'
                    : 'px-6 py-2 h-10'
                }
              >
                Fazer Orçamento
              </Button>
            </div>
          </nav>

          <button
            className="md:hidden p-2 focus:outline-none cursor-pointer hover:scale-105 transition-transform rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? (
              <X className="text-secondary-900 w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu
                className={cn(
                  'w-6 h-6',
                  !isScrolled ? 'text-white' : 'text-secondary-900'
                )}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-t border-border-light shadow-xl h-[calc(100vh-72px)] overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-secondary-900 text-2xl font-serif font-medium py-4 border-b border-border-light last:border-0 hover:text-primary-500 transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}

            <div className="mt-8">
              <Button
                href="#contact"
                fullWidth
                variant="primary"
                className="py-4"
              >
                Solicitar Orçamento Agora
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
