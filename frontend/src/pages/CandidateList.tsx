import React, { useState } from 'react'; // useEffect kaldırıldı
import { Eye, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/formatDate';

// Yeni hook'ları ve tipleri içe aktar
import useCandidates from '../../hooks/useCandidates';
// useCategories ve Category tipi artık gerekli değil, kaldırıldı.
import { Candidate } from '../../types/candidate'; // Candidate tipi

const CandidateList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Özel hook'u kullanarak adayları çek
  // Kategoriler artık aday objesinin içinde olduğu için useCategories'e gerek yok.
  const { candidates, loading: candidatesLoading, error: candidatesError } = useCandidates();

  // Kategori ID'lerini isimlerle eşleştirmek için bir harita oluşturma ve useEffect kaldırıldı.
  // Bunun yerine, mevcut adaylardan benzersiz kategorileri dinamik olarak alacağız.
  const uniqueCategories = Array.from(new Set(candidates.map(c => c.category))).filter(Boolean).sort();
  // .filter(Boolean) boş veya null kategori adlarını elemek için
  // .sort() alfabetik sıralama için

  const filteredCandidates = candidates.filter((candidate: Candidate) => {
    const name = candidate.candidate_name || '';
    const position = candidate.position || '';
    // Kategori adı doğrudan candidate objesinden alınıyor
    const candidateCategoryName = candidate.category || ''; // Varsayılan boş string

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.toLowerCase().includes(searchQuery.toLowerCase());

    // selectedCategory boşsa veya adayın kategorisi seçili kategoriye eşitse
    const matchesCategory = selectedCategory === '' || candidateCategoryName.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aday Listesi</h1>
          <p className="text-gray-500 mt-1">Tüm aday başvurularını yönetin ve görüntüleyn</p>
        </div>
        <Button>Excele Aktar</Button>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Tüm Adaylar</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Aday Ara..."
              icon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Tüm Kategoriler</option>
                {/* uniqueCategories listesini kullanarak seçenekleri oluştur */}
                {uniqueCategories.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>İsim Soyisim</TableHeader>
                <TableHeader>Pozisyon</TableHeader>
                <TableHeader>Kategori</TableHeader>
                <TableHeader>Yükleme Tarihi</TableHeader>
                <TableHeader>Not</TableHeader>
                <TableHeader>Durum</TableHeader>
                <TableHeader className="text-right">Eylem</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidatesLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Adaylar yükleniyor...
                  </TableCell>
                </TableRow>
              ) : candidatesError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-red-500">
                    Adaylar yüklenirken bir hata oluştu: {candidatesError.message}
                  </TableCell>
                </TableRow>
              ) : filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate: Candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium text-gray-900">{candidate.candidate_name}</TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      {/* Doğrudan candidate.category kullanılıyor */}
                      <Badge variant="primary">{candidate.category || 'Bilinmiyor'}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(candidate.uploaded_at)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {candidate.notes || '—'}
                    </TableCell>
                    <TableCell>
                      {/* Durum bilgisi varsa göster, yoksa boş bırak */}
                      {candidate.status ? (
                        <Badge variant="secondary">{candidate.status}</Badge>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye size={16} />}
                          aria-label="View candidate"
                        >
                          Görüntüle
                        </Button>
                        {/* <Button
                          variant="ghost"
                          size="sm"
                          icon={<Download size={16} />}
                          aria-label="Download CV"
                        >
                          İndir
                        </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Filtrelere Uygun Aday Bulunamadı
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

export default CandidateList;