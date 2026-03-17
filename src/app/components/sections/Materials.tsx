import Image from 'next/image';
import { MATERIALS } from '../../constants';

export function Materials() {
  return (
    <section
      className="py-12 md:py-24 bg-stone-900 text-stone-200"
      aria-labelledby="materials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3
          id="materials-heading"
          className="font-serif text-2xl md:text-4xl mb-6 md:mb-12 text-white tracking-tight"
        >
          Acabamentos Selecionados
        </h3>

        {/* Mobile: Grid 2x2 | Desktop: Flex */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-x-3 gap-y-6 md:gap-12">
          {MATERIALS.map((material) => (
            <div key={material.id} className="group flex flex-col items-center">
              {/* Moldura da Imagem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-stone-700 group-hover:ring-stone-500 transition-[box-shadow,transform,ring-color] duration-500">
                  <Image
                    src={material.textureUrl}
                    alt={`Textura de ${material.name} para reforma de estofados - ${material.type}`}
                    fill
                    className="rounded-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                    sizes="(min-width: 768px) 144px, 112px"
                  />
                </div>
              </div>

              {/* Texto com tipografia mais refinada */}
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-stone-400 group-hover:text-white transition-colors duration-300 text-center px-2">
                {material.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-center gap-3">
          <div className="h-px w-12 bg-stone-700" />
          <p className="text-stone-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed italic">
            Trabalhamos com os melhores fornecedores de tecidos nacionais e
            importados.
          </p>
        </div>
      </div>
    </section>
  );
}
