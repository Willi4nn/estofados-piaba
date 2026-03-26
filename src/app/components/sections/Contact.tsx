'use client';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../../constants';
import { Button } from '../ui/Button';
// Formata o número para o padrão brasileiro: +55 (34) 99765-9558
function formatPhoneNumber(phone: string) {
  const match = phone.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
  if (!match) return phone;
  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
}

export function Contact() {
  // IMPORTANTE: Atualize estes links com o endereço correto do Google Maps
  // 1. LINK PARA O IFRAME (Embed): Vá no Google Maps > Busque "R. Alaor de Melo Ribeiro, 35, Patos de Minas" > Compartilhar > Incorporar um mapa > Copie apenas o que está entre aspas no src=""
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5141921912214!2d-46.493684900000005!3d-18.5959283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae8bfe74a7a4a7%3A0xcf128d8f8245fc6e!2sEstofados%20Piaba!5e0!3m2!1spt-BR!2sbr!4v1771023001445!5m2!1spt-BR!2sbr';

  // 2. LINK PARA O BOTÃO (Navegação): Busque o endereço no Google Maps e copie o link de compartilhamento
  const googleMapsSearchUrl = 'https://maps.app.goo.gl/96R12cHqHsK7x9v49';

  const handleDirections = () => {
    window.open(googleMapsSearchUrl, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-10 md:py-24 bg-stone-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-xl border border-stone-100 overflow-hidden rounded-sm">
          {/* Info Side */}
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <h2
              id="contact-heading"
              className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2"
            >
              Contato
            </h2>
            <h3 className="font-serif text-2xl md:text-4xl text-primary mb-4 md:mb-6">
              Visite nossa oficina e conheça nossos serviços de perto
            </h3>
            <p className="text-stone-600 mb-6 md:mb-8 font-light text-sm md:text-lg max-w-md">
              Estamos prontos para receber você e transformar seu projeto em
              realidade. Venha conhecer nossos tecidos e acabamentos.
            </p>

            <div className="space-y-5 md:space-y-6">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-stone-100 rounded-full text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                    Telefone / WhatsApp
                  </p>
                  <p className="text-stone-800 font-medium">
                    {formatPhoneNumber(WHATSAPP_NUMBER)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-stone-100 rounded-full text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                    E-mail
                  </p>
                  <p className="text-stone-800 font-medium">
                    josepiabasilva@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-3 bg-stone-100 rounded-full text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                    Horário de Atendimento
                  </p>
                  <p className="text-stone-800 font-medium">
                    Seg - Sex: 07h às 18h | Sáb: 08h às 13h
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10">
              <Button
                onClick={() =>
                  (window.location.href = `https://wa.me/${WHATSAPP_NUMBER}`)
                }
                className="px-8 py-4 "
                variant="green"
              >
                Agendar Visita Técnica
              </Button>
            </div>
          </div>

          {/* Map Side */}
          <div className="flex flex-col md:block md:relative h-auto md:h-125 lg:h-150 w-full overflow-hidden bg-stone-100">
            {/* Área do Mapa: Altura fixa no mobile, preenche tudo no desktop */}
            <div className="h-87.5 md:h-full w-full md:absolute md:inset-0 z-0">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full grayscale-[0.2] contrast-[1.1]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Estofados Piaba"
              ></iframe>
            </div>

            {/* Card de Endereço */}
            {/* Mobile: Bloco estático abaixo do mapa | Desktop: Card flutuante à direita */}
            <div className="z-10 w-full md:w-80 md:absolute md:bottom-10 md:right-10 bg-white md:bg-white/95 md:backdrop-blur-sm p-6 md:shadow-2xl border-t md:border border-stone-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-stone-100 p-2 rounded-full">
                  <MapPin className="text-primary shrink-0" size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-base uppercase tracking-tight mb-1">
                    Nossa Oficina
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium">
                    R. Alaor de Melo Ribeiro, 35 <br />
                    Jardim Panorâmico <br />
                    Patos de Minas - MG
                  </p>
                </div>
              </div>

              <Button
                variant="primary" // Mudei para primary para dar mais destaque à ação principal
                fullWidth
                className="flex items-center justify-center gap-2 py-1 text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
                onClick={handleDirections}
              >
                <Navigation size={18} />
                Abrir no Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale connosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center group overflow-hidden"
      >
        <FaWhatsapp size={28} className="text-white shrink-0" />

        {/* A MUDANÇA É AQUI: Adicionado 'md:group-hover:...' para só expandir no Desktop */}
        <span className="max-w-0 opacity-0 md:group-hover:max-w-xs md:group-hover:opacity-100 md:group-hover:ml-3 transition-all duration-500 ease-in-out whitespace-nowrap font-medium hidden md:inline-block">
          Orçamento Rápido
        </span>
      </a>
    </section>
  );
}
