# 📁 Gerenciamento de Dados do Portfólio

## 📝 Como adicionar um novo projeto

### 1. Upload das imagens no Cloudflare R2
- Faça upload das imagens na pasta apropriada:
  - `/moveis/sofas/`
  - `/moveis/poltronas/`
  - `/moveis/cadeiras/`
  - `/moveis/cabeceiras/`
  - `/moveis/puffs/`

### 2. Adicionar projeto no arquivo `projects.ts`

Abra `data/projects.ts` e adicione um novo objeto no array da categoria correspondente:

```typescript
{
  images: ['/moveis/sofas/nome-da-imagem.jpg'],
  date: '2026-03-15', // Opcional: formato YYYY-MM-DD
  description: 'Descrição opcional do projeto', // Opcional
  title: 'Título personalizado' // Opcional: será gerado automaticamente
}
```

### 3. Exemplos práticos

#### Projeto com uma imagem:
```typescript
{
  images: ['/moveis/sofas/sofa-cinza-moderno.jpg'],
  date: '2026-03-15',
}
```

#### Projeto com múltiplas imagens:
```typescript
{
  images: [
    '/moveis/poltronas/poltrona-antes.jpg',
    '/moveis/poltronas/poltrona-depois.jpg',
    '/moveis/poltronas/poltrona-detalhe.jpg',
  ],
  date: '2026-03-20',
  description: 'Reforma completa com troca de espuma e tecido',
}
```

## 🎨 Título automático

Se você **não** fornecer um título, ele será gerado automaticamente:
- **Com data**: `Sofá - Março 2026`
- **Sem data**: `Sofá #27`

Se você **fornecer** um título personalizado:
```typescript
{
  title: 'Sofá Retrô Restaurado',
  images: ['/moveis/sofas/retro-1.jpg'],
  date: '2026-03-15',
}
```

## 📊 Estrutura dos dados

```typescript
interface RawProject {
  images: string[];           // OBRIGATÓRIO: Array de caminhos
  date?: string;              // OPCIONAL: Data no formato YYYY-MM-DD
  title?: string;             // OPCIONAL: Título personalizado
  description?: string;       // OPCIONAL: Descrição do projeto
}
```

## ✅ Boas práticas

1. **Sempre use array** para `images`, mesmo com 1 imagem
2. **Use datas reais** quando possível (formato `YYYY-MM-DD`)
3. **Nomes de arquivo descritivos** ajudam na organização
4. **Ordene por data** (mais recentes no final do array)
5. **Adicione descrições** para projetos especiais

## 🔄 Migração futura

Esta estrutura facilita migração para:
- ✅ CMS (Contentful, Sanity, etc.)
- ✅ Banco de dados (PostgreSQL, MongoDB, etc.)
- ✅ API externa
- ✅ Sistema de admin customizado

## 📂 Estrutura de pastas no R2

```
pub-e7e92268921342d8b8a850537a5cc877.r2.dev/
├── moveis/
│   ├── sofas/
│   ├── poltronas/
│   ├── cadeiras/
│   ├── cabeceiras/
│   └── puffs/
└── tecidos/
```
