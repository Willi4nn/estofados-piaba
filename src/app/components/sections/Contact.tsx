'use client';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../../constants';
import { Button } from '../ui/Button';

function formatPhoneNumber(phone: string) {
  const match = phone.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
  if (!match) return phone;
  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
}

export function Contact() {
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5141921912214!2d-46.493684900000005!3d-18.5959283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae8bfe74a7a4a7%3A0xcf128d8f8245fc6e!2sEstofados%20Piaba!5e0!3m2!1spt-BR!2sbr!4v1771023001445!5m2!1spt-BR!2sbr';

  const googleMapsSearchUrl = 'https://maps.app.goo.gl/96R12cHqHsK7x9v49';

  const handleDirections = () => {
    window.open(googleMapsSearchUrl, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface shadow-card border border-border-light overflow-hidden rounded-2xl">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2
              id="contact-heading"
              className="text-sm font-semibold text-secondary-800 uppercase tracking-widest mb-2"
            >
              Contato
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl text-secondary-900 mb-4 md:mb-6">
              Visite nossa oficina e conheça nossos serviços de perto
            </h3>
            <p className="text-text-secondary mb-8 md:mb-10 font-light text-sm md:text-base max-w-md leading-relaxed">
              Estamos prontos para receber você e transformar seu projeto em
              realidade. Venha conhecer nossos tecidos e acabamentos.
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-primary-50 rounded-full text-primary-600">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-secondary-800 font-bold mb-1">
                    Telefone / WhatsApp
                  </p>
                  <p className="text-secondary-900 font-medium">
                    {formatPhoneNumber(WHATSAPP_NUMBER)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-primary-50 rounded-full text-primary-600">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-secondary-800 font-bold mb-1">
                    E-mail
                  </p>
                  <p className="text-secondary-900 font-medium">
                    josepiabasilva@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-primary-50 rounded-full text-primary-600">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-secondary-800 font-bold mb-1">
                    Horário de Atendimento
                  </p>
                  <p className="text-secondary-900 font-medium">
                    Seg - Sex: 07h às 18h <br className="md:hidden" /> Sáb: 08h
                    às 13h
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-12">
              <Button
                onClick={() =>
                  (window.location.href = `https://wa.me/${WHATSAPP_NUMBER}`)
                }
                className="w-full md:w-auto"
                variant="green"
              >
                Agendar Visita Técnica
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:block md:relative h-96 md:h-auto w-full overflow-hidden bg-primary-50">
            <div className="h-full w-full md:absolute md:inset-0 z-0">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full grayscale-[0.2] contrast-[1.1] opacity-90"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Estofados Piaba"
              ></iframe>
            </div>

            <div className="hidden md:block z-10 w-full md:w-80 md:absolute md:bottom-8 md:right-8 bg-surface/95 backdrop-blur-sm p-6 shadow-2xl border border-border-light rounded-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary-50 p-2.5 rounded-full">
                  <MapPin className="text-primary-600 shrink-0" size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-secondary-900 text-lg mb-1">
                    Nossa Oficina
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    R. Alaor de Melo Ribeiro, 35 <br />
                    Jardim Panorâmico <br />
                    Patos de Minas - MG
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                className="gap-2 text-xs"
                onClick={handleDirections}
              >
                <Navigation size={16} />
                Abrir no Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center group overflow-hidden"
      >
        <FaWhatsapp size={28} className="text-white shrink-0" />
        <span className="max-w-0 opacity-0 md:group-hover:max-w-xs md:group-hover:opacity-100 md:group-hover:ml-3 transition-all duration-500 ease-in-out whitespace-nowrap font-medium hidden md:inline-block">
          Orçamento Rápido
        </span>
      </a>
    </section>
  );
}
