'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, type MouseEvent } from 'react';
import { cn } from '../../lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          ? 'bg-white/80 backdrop-blur-lg shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
        boxShadow:
          isMobileMenuOpen || isScrolled
            ? '0 4px 24px rgba(0,0,0,0.08)'
            : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Clicar no logo leva ao topo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            {isMobileMenuOpen || isScrolled ? (
              <Image
                src="/piaba-logo-black.png"
                alt="Logo Estofados Piaba"
                width={160}
                height={40}
                className="h-10" // Removido o w-auto do Tailwind
                style={{ width: 'auto' }} // Adicionado style width auto para resolver o warning
                priority
              />
            ) : (
              <Image
                src="/piaba-logo-white.png"
                alt="Logo Estofados Piaba"
                width={160}
                height={40}
                className="h-10" // Removido o w-auto do Tailwind
                style={{ width: 'auto' }} // Adicionado style width auto para resolver o warning
                priority
              />
            )}
            <span
              className={`font-serif text-2xl font-bold tracking-wide ${
                isMobileMenuOpen || isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              ESTOFADOS PIABA
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 py-2 group',
                  isScrolled
                    ? 'text-stone-600 hover:text-primary'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full',
                    isScrolled ? 'bg-primary' : 'bg-white'
                  )}
                />
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 focus:outline-none cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-primary w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu
                className={cn(
                  'w-6 h-6',
                  !isScrolled ? 'text-white' : 'text-primary'
                )}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-stone-100 shadow-lg h-screen md:h-auto">
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-primary text-xl font-serif font-medium py-3 border-b border-stone-100 last:border-0 hover:text-stone-500 transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
