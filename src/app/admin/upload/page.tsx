import { notFound } from 'next/navigation';
import { UploadForm } from './UploadForm';

export default function AdminUploadPage() {
  // Trava de Segurança Nível 2: Retorna 404 na Vercel
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-3xl text-secondary-900 mb-2">
            Upload de Portfólio
          </h1>
          <p className="text-text-secondary">
            Envio direto para o Cloudflare R2
          </p>
        </header>

        <div className="bg-white p-8 rounded-2xl shadow-card border border-border-light">
          <UploadForm />
        </div>
      </div>
    </main>
  );
}
