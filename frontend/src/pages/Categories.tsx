import React, { useState } from 'react';
import { Plus, Edit, Trash, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

// Mock data'yı kaldırın
// import { categories as initialCategories } from '../data/mockData';

// Yeni hook'ları ve tipleri içe aktar
import useCategories from '../../hooks/useCategories';
import { Category, CategoryCreateData, CategoryUpdateData } from '../../types/category';

interface CategoryFormData {
  id: number | ''; // Yeni eklerken boş, düzenlerken number
  name: string;
  description: string;
}

const Categories = () => {
  // useCategories hook'unu kullan
  const { 
    categories, 
    loading, 
    error, 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    operationLoading, 
    operationError 
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null); // ID tipi number olarak güncellendi
  const [formData, setFormData] = useState<CategoryFormData>({
    id: '',
    name: '',
    description: '',
  });
  // isSubmitting artık operationLoading tarafından yönetiliyor
  // const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formError, setFormError] = useState<string | null>(null); // Form hataları için

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
    });
    setEditingId(null);
    setShowForm(true);
    setFormError(null); // Formu açarken hata mesajını temizle
  };

  const handleEdit = (id: number) => { // ID tipi number olarak güncellendi
    const category = categories.find(c => c.id === id);
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description || '',
      });
      setEditingId(id);
      setShowForm(true);
      setFormError(null); // Formu açarken hata mesajını temizle
    }
  };

  const handleDelete = async (id: number) => { // ID tipi number olarak güncellendi
    // window.confirm yerine basit bir modal veya Toast mesajı kullanabilirsiniz.
    // Şimdilik, Canvas ortamında alert/confirm kullanılmaması gerektiği için basit bir konsol mesajı ekledim
    // ve doğrudan silme işlemini başlattım. Gerçek uygulamada bir onay mekanizması olmalı.
    const confirmDelete = window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?');
    if (!confirmDelete) {
        return;
    }

    try {
      await deleteCategory(id);
      // Silme başarılı, hook zaten refetch yapıyor.
    } catch (err: any) {
      console.error('Kategori silinirken hata:', err);
      setFormError(err.message || 'Kategori silinirken bir hata oluştu.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) { // Boşlukları da kontrol et
      setFormError('Kategori adı boş olamaz.');
      return;
    }
    setFormError(null); // Hata mesajını temizle

    try {
      if (editingId) {
        // Mevcut kategoriyi güncelle
        const updateData: CategoryUpdateData = {
          id: editingId,
          name: formData.name,
          description: formData.description,
        };
        await updateCategory(editingId, updateData);
      } else {
        // Yeni kategori ekle
        const createData: CategoryCreateData = {
          name: formData.name,
          description: formData.description,
        };
        await createCategory(createData);
      }
      
      // İşlem başarılı olursa formu kapat ve sıfırla
      setShowForm(false);
      setEditingId(null);
      setFormData({ id: '', name: '', description: '' });
    } catch (err: any) {
      console.error('Kategori işlemi hatası:', err);
      setFormError(err.message || 'Kategori kaydedilirken bir hata oluştu.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ id: '', name: '', description: '' });
    setFormError(null); // İptal ederken hata mesajını temizle
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="text-gray-500 mt-1">Aday başvuruları için iş kategorilerini yönetin</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={handleAddNew}>
          Yeni Kategori Ekle
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Kategori Düzenle' : 'Kategori Ekle'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Kategori Adı"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Kategori Adı Girin"
                required
              />
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Açıklama Girin"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}

              <div className="flex justify-end space-x-3 pt-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                >
                  İptal Et
                </Button>
                <Button
                  type="submit"
                  icon={<Save size={16} />}
                  isLoading={operationLoading} // Hook'tan gelen loading state'i
                  disabled={operationLoading}
                >
                  {operationLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kategoriler</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>İsim</TableHeader>
                <TableHeader>Açıklama</TableHeader>
                <TableHeader>Başvuru Sayısı</TableHeader>
                <TableHeader className="text-right">İşlem</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Veri çekme loading'i
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Kategoriler yükleniyor...
                  </TableCell>
                </TableRow>
              ) : error ? ( // Veri çekme hatası
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-red-500">
                    Kategoriler yüklenirken bir hata oluştu: {error.message}
                  </TableCell>
                </TableRow>
              ) : categories.length > 0 ? (
                categories.map((category: Category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium text-gray-900">{category.name}</TableCell>
                    <TableCell className="max-w-md">
                      {category.description || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={(category.cv_count || 0) > 0 ? 'primary' : 'default'}>
                        {(category.cv_count || 0)} başvuru{(category.cv_count || 0) !== 1 ? '' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit size={16} />}
                          aria-label="Edit category"
                          onClick={() => handleEdit(category.id)}
                          disabled={operationLoading} // İşlem devam ederken butonları devre dışı bırak
                        >
                          Düzenle
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash size={16} />}
                          aria-label="Delete category"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(category.id)}
                          disabled={operationLoading || (category.cv_count || 0) > 0} // İşlem devam ederken veya aday varsa silme butonunu devre dışı bırak
                        >
                          Sil
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                   Hiçbir kategori bulunamadı. Bir tane oluşturmak için "Yeni Kategori Ekle"ye tıklayın.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;