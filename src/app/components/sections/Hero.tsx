import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
          alt="Interior luxuoso com estofados elegantes - Estofados Piaba Patos de Minas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 text-stone-200">
          Estofados em Patos de Minas há 45 Anos
        </h2>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
          Renove a Alma <br />
          <span className="italic">do seu Lar</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-stone-100 mb-10 font-light">
          Estofaria especializada em reforma de móveis em Patos de Minas-MG.
          Unimos o design contemporâneo à durabilidade dos materiais e
          acabamento impecável. Orçamento grátis!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Using explicit 'white' variant to guarantee dark text on white background */}
          <Button href="#contact" variant="white">
            Solicitar Orçamento
          </Button>

          <Button
            href="#portfolio"
            variant="outline"
            className="text-white border-white hover:bg-white/10 hover:text-white"
          >
            Ver Projetos <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
