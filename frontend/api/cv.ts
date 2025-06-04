// frontend/api/cv.ts
import { API_BASE_URL } from './config';
import { CVUploadForm, UploadedFile } from '../types/cv';

interface UploadCVParams {
  formData: CVUploadForm;
  cvUploads: UploadedFile[];
}

export const uploadCV = async ({ formData, cvUploads }: UploadCVParams): Promise<Response> => {
  const form = new FormData();
  form.append('position', formData.position);
  form.append('categoryId', formData.categoryId);
  form.append('notes', formData.notes);

  cvUploads.forEach(upload => {
    form.append('files', upload.file);
    form.append('candidateNames', upload.candidateName);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/cv/upload/`, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      // Hata durumunda sunucudan gelen mesajı veya status'ü fırlatabiliriz.
      const errorData = await response.json(); // Hata mesajı varsa al
      throw new Error(`CV yükleme hatası: ${response.status} - ${errorData.detail || response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('CV yükleme hatası:', error);
    throw error; // Hatayı çağıran yere fırlat
  }
};