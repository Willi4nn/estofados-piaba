export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'Sofa' | 'Scissors' | 'Sparkles';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string; // Imagem principal (primeira do array)
  allImages: string[]; // Todas as imagens do projeto
  date?: string; // Data da reforma (YYYY-MM-DD)
  description?: string; // Descrição opcional do projeto
}

// Interface para os dados brutos (antes do processamento)
export interface RawProject {
  title?: string; // Opcional: será gerado automaticamente se não fornecido
  images: string[]; // Array de caminhos relativos (sem R2_URL)
  date?: string; // Data da reforma (formato YYYY-MM-DD)
  description?: string; // Descrição opcional
}

export interface Material {
  id: string;
  name: string;
  type: 'Tecido' | 'Couro' | 'Veludo';
  textureUrl: string;
}

export interface ContactFormState {
  name: string;
  phone: string;
  message: string;
}
