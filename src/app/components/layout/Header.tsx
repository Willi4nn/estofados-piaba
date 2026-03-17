'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, type MouseEvent } from 'react';

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
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
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
                className="h-10 w-auto"
                priority
              />
            ) : (
              <Image
                src="/piaba-logo-white.png"
                alt="Logo Estofados Piaba"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            )}
            <span
              className={`font-serif text-2xl font-semibold tracking-wide ${
                isMobileMenuOpen || isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              ESTOFADOS PIABA
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm uppercase tracking-widest font-medium hover:text-stone-400 transition-colors ${
                  isScrolled ? 'text-primary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X />
            ) : (
              <Menu
                className={
                  !isScrolled && !isMobileMenuOpen
                    ? 'text-white'
                    : 'text-primary'
                }
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
