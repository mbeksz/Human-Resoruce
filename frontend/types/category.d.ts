// frontend/types/category.d.ts
export interface Category {
  id: number; // Backend'den gelen ID tipine göre (genellikle number)
  name: string;
  description: string | null; // Açıklama opsiyonel olabilir
  cv_count?: number; // Bu alan backend'den geliyorsa veya frontend'de hesaplanıyorsa ekleyin
}

// Yeni kategori eklerken kullanılacak form verisi (ID olmadan)
export interface CategoryCreateData {
  name: string;
  description: string;
}

// Kategori güncellerken kullanılacak form verisi (ID ile)
export interface CategoryUpdateData {
  id: number;
  name: string;
  description: string;
}