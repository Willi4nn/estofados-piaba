'use client';

import { useState } from 'react';
import { uploadImageToR2 } from '../../actions/upload.action';
import { Button } from '../../components/ui/Button';

export function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    path?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await uploadImageToR2(formData);
      setResult(response);
      if (response.success) {
        (event.target as HTMLFormElement).reset();
      }
    } catch (err) {
      setResult({ success: false, error: 'Erro inesperado de rede.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-sm font-semibold text-secondary-900"
        >
          Categoria do Móvel
        </label>
        <select
          name="category"
          id="category"
          required
          className="p-3 rounded-lg border border-border-light bg-background focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="sofas">Sofás</option>
          <option value="poltronas">Poltronas</option>
          <option value="cadeiras">Cadeiras</option>
          <option value="cabeceiras">Cabeceiras</option>
          <option value="puffs">Puffs</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="file"
          className="text-sm font-semibold text-secondary-900"
        >
          Imagem (JPEG, PNG, WEBP)
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/jpeg, image/png, image/webp, image/avif"
          required
          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 cursor-pointer text-text-secondary"
        />
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg text-sm ${result.success ? 'bg-[#25D366]/10 text-secondary-900 border border-[#25D366]/20' : 'bg-red-50 text-red-800 border border-red-200'}`}
        >
          {result.error || (
            <div className="flex flex-col gap-2">
              <strong className="text-[#20bd5a]">Upload bem-sucedido!</strong>
              <span>
                Copie o caminho abaixo e cole no seu{' '}
                <code className="bg-white px-1 py-0.5 rounded">
                  projects.ts
                </code>
                :
              </span>
              <code className="bg-white p-2 rounded block select-all border border-border-light text-primary-600 break-all">
                {result.path}
              </code>
            </div>
          )}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Enviando...' : 'Fazer Upload'}
      </Button>
    </form>
  );
}
