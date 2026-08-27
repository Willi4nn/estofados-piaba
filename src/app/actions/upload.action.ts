'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '../lib/r2';

export async function uploadImageToR2(formData: FormData) {
  // Trava de Segurança Nível 1: Impede execução em Produção
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(
      'Acesso negado: Upload permitido apenas em ambiente local.'
    );
  }

  try {
    const file = formData.get('file') as File;
    const category = formData.get('category') as string; // ex: 'sofas'

    if (!file || !category) {
      return { success: false, error: 'Arquivo ou categoria ausente.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Higienização: remove espaços e caracteres especiais, adiciona timestamp
    const safeName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    const fileName = `moveis/${category}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    return {
      success: true,
      path: `/${fileName}`, // Retorna exatamente o formato que o seu projects.ts espera
      message: 'Upload concluído!',
    };
  } catch (error) {
    console.error('Erro no upload para o R2:', error);
    return { success: false, error: 'Falha ao fazer upload da imagem.' };
  }
}
