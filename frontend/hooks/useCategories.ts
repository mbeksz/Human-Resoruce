// frontend/hooks/useCategories.ts
import { useState, useEffect, useCallback } from 'react';
import { categoriesAPI } from '../api';
import { Category, CategoryCreateData, CategoryUpdateData } from '../types/category';

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  createCategory: (data: CategoryCreateData) => Promise<Category>;
  updateCategory: (id: number, data: CategoryUpdateData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  operationLoading: boolean; // CRUD işlemleri için ayrı bir loading state'i
  operationError: Error | null; // CRUD işlemleri için ayrı bir error state'i
}

const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Veri çekme loading'i
  const [error, setError] = useState<Error | null>(null); // Veri çekme hatası
  const [operationLoading, setOperationLoading] = useState<boolean>(false); // CRUD loading'i
  const [operationError, setOperationError] = useState<Error | null>(null); // CRUD hatası
  const [triggerRefetch, setTriggerRefetch] = useState(0);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesAPI.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, triggerRefetch]);

  const refetch = () => {
    setTriggerRefetch(prev => prev + 1);
  };

  const handleCreateCategory = useCallback(async (data: CategoryCreateData) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      const newCategory = await categoriesAPI.createCategory(data);
      refetch(); // Veri başarıyla eklendikten sonra listeyi yeniden çek
      return newCategory;
    } catch (err: any) {
      setOperationError(err);
      throw err; // Hatanın component'e yayılmasını sağla
    } finally {
      setOperationLoading(false);
    }
  }, [refetch]);

  const handleUpdateCategory = useCallback(async (id: number, data: CategoryUpdateData) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      const updatedCategory = await categoriesAPI.updateCategory(id, data);
      refetch(); // Veri başarıyla güncellendikten sonra listeyi yeniden çek
      return updatedCategory;
    } catch (err: any) {
      setOperationError(err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  }, [refetch]);

  const handleDeleteCategory = useCallback(async (id: number) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      await categoriesAPI.deleteCategory(id);
      refetch(); // Veri başarıyla silindikten sonra listeyi yeniden çek
    } catch (err: any) {
      setOperationError(err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  }, [refetch]);

  return {
    categories,
    loading,
    error,
    refetch,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    operationLoading,
    operationError,
  };
};

export default useCategories;