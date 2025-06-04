// frontend/pages/UploadCV.tsx
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FileUpload from '../components/ui/FileUpload';

// API Modüllerini İçe Aktar
import { cvAPI } from '../../api';

// Özel Hook'u İçe Aktar
import useCategories from '../../hooks/useCategories';

// Tipleri İçe Aktar
import { CVUploadForm, UploadedFile } from '../../types/cv';
// import { Category } from '../types/category'; // Artık hook içinde yönetiliyor


const UploadCV = () => {
  // Kategorileri özel hook'tan çek
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const [formData, setFormData] = useState<CVUploadForm>({
    position: '',
    categoryId: '',
    notes: '',
  });
  const [cvUploads, setCvUploads] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Başarılı gönderim mesajı için
  const [uploadError, setUploadError] = useState<string | null>(null); // Yükleme hatası mesajı için


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesSelect = (files: File[], names: string[]) => {
    const uploads = files.map((file, index) => ({
      file,
      candidateName: names[index],
    }));
    setCvUploads(uploads);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.position || !formData.categoryId || cvUploads.length === 0) {
      setUploadError("Lütfen tüm zorunlu alanları doldurun ve en az bir CV yükleyin.");
      return;
    }

    setIsSubmitting(true);
    setUploadError(null); // Yeni gönderim öncesi önceki hatayı temizle

    try {
      await cvAPI.uploadCV({ formData, cvUploads }); // API fonksiyonunu çağır
      setSubmitted(true);
      // Başarılı olursa formu ve CV'leri temizle
      setTimeout(() => {
        setFormData({ position: '', categoryId: '', notes: '' });
        setCvUploads([]);
        setSubmitted(false);
      }, 2000);
    } catch (error: any) {
      console.error('CV yükleme hatası:', error);
      setUploadError(error.message || 'CV yüklenirken bir hata oluştu.'); // Hata mesajını göster
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cv Yükle</h1>
        <p className="text-gray-500 mt-1">Aynı Pozisyon İçin Birden Fazla Adayın Özgeçmişini Yükleyin</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Pozisyon Bilgisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Pozisyon Adı Girin"
              required
            />

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Kategori Seç</option>
                {categoriesLoading && <option>Kategoriler yükleniyor...</option>}
                {categoriesError && <option>Kategoriler yüklenemedi.</option>}
                {!categoriesLoading && !categoriesError && categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <FileUpload
              label="CV Dosyası"
              accept=".pdf"
              helperText="Birden Fazla CV Yükleyebilirsiniz (Maksimum 5MB)"
              onFilesSelect={handleFilesSelect}
              multiple={true}
              maxSize={5 * 1024 * 1024} // 5MB
            />

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Not (Opsiyonel)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ek Notlarınızı Girin"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {cvUploads.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Algılanan İsimler</h3>
                <ul className="space-y-1">
                  {cvUploads.map((upload, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {upload.candidateName} ({upload.file.name})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Yükleme hatası mesajını göster */}
            {uploadError && (
              <div className="text-red-600 text-sm mt-2">
                {uploadError}
              </div>
            )}

          </CardContent>
          <CardFooter className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
            {submitted ? (
              <div className="text-green-600 font-medium flex items-center">
                Cv'ler başarıyla yüklendi!
              </div>
            ) : (
              <Button
                type="submit"
                icon={<Save size={16} />}
                isLoading={isSubmitting}
                disabled={isSubmitting || cvUploads.length === 0 || categoriesLoading} // Kategoriler yüklenirken butonu devre dışı bırak
              >
                {isSubmitting ? 'Yükleniyor...' : `${cvUploads.length} CV Yükle `}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UploadCV;