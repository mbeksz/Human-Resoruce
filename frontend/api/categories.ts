// frontend/api/categories.ts
import { API_BASE_URL } from './config';
import { Category, CategoryCreateData, CategoryUpdateData } from '../types/category';

// Kategorileri getir
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv/categories/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error("Kategoriler çekilemedi:", error);
    throw error;
  }
};

// Yeni kategori oluştur
export const createCategory = async (categoryData: CategoryCreateData): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Kategori oluşturma hatası: ${response.status} - ${errorData.detail || response.statusText}`);
    }
    const newCategory: Category = await response.json();
    return newCategory;
  } catch (error) {
    console.error("Kategori oluşturulamadı:", error);
    throw error;
  }
};

// Kategori güncelle
export const updateCategory = async (id: number, categoryData: CategoryUpdateData): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv/categories/${id}/`, { // Backend endpoint'inize göre ayarlayın
      method: 'PUT', // veya PATCH
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Kategori güncelleme hatası: ${response.status} - ${errorData.detail || response.statusText}`);
    }
    const updatedCategory: Category = await response.json();
    return updatedCategory;
  } catch (error) {
    console.error("Kategori güncellenemedi:", error);
    throw error;
  }
};

// Kategori sil
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv/categories/${id}/`, { // Backend endpoint'inize göre ayarlayın
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Kategori silme hatası: ${response.status} - ${errorData.detail || response.statusText}`);
    }
    // DELETE isteği genellikle bir şey döndürmez, sadece status 204 No Content veya 200 OK
  } catch (error) {
    console.error("Kategori silinemedi:", error);
    throw error;
  }
};