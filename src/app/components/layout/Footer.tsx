import { SiFacebook, SiInstagram } from 'react-icons/si';
import Image from 'next/image';

export function Footer() {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/estofados_piaba/',
      icon: <SiInstagram size={28} aria-hidden="true" />,
      'aria-label': 'Siga Estofados Piaba no Instagram',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=100091404635850',
      icon: <SiFacebook size={28} aria-hidden="true" />,
      'aria-label': 'Siga Estofados Piaba no Facebook',
    },
  ];

  return (
    <footer className="bg-primary text-white py-8 md:py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <Image
              src="/piaba-logo-2-white.png"
              alt="Logo Estofados Piaba"
              width={180}
              height={96}
              className="h-24 w-auto"
            />
            <p className="text-stone-400 text-sm">
              Transformando ambientes, restaurando histórias.
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map(
              ({ href, icon, 'aria-label': ariaLabel }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-stone-400 hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center w-16 h-16 p-4 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                >
                  {icon}
                </a>
              )
            )}
          </div>

          <div className="text-center md:text-right text-stone-500 text-sm">
            <p>© {new Date().getFullYear()} Estofados Piaba.</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
