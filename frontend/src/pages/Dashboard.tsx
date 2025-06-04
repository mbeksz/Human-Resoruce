// frontend/src/pages/Dashboard.tsx
import React, { useMemo } from 'react';
import { 
  BarChart, // BarChart ikonu artık aktivite bölümü olmadığı için kaldırılabilir
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserPlus, 
  FolderClosed, 
  ClipboardList
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { formatDate } from '../utils/formatDate';

import useCandidates from '../../hooks/useCandidates';
import useCategories from '../../hooks/useCategories';
import { Candidate } from '../../types/candidate';
import { Category } from '../../types/category';

// recentActivities mock datasını ve import'unu kaldırıyoruz.
// Artık bu diziye ihtiyacımız yok.


const Dashboard = () => {
  const { candidates, loading: candidatesLoading, error: candidatesError } = useCandidates();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const iconMap: Record<string, React.ReactNode> = {
    'users': <Users className="h-5 w-5" />,
    'user-plus': <UserPlus className="h-5 w-5" />,
    'folder': <FolderClosed className="h-5 w-5" />,
    'clipboard-list': <ClipboardList className="h-5 w-5" />,
  };

  const dashboardStats = useMemo(() => {
    const totalCandidates = candidates.length;
    const totalCategories = categories.length;
    const newCandidates = candidates.filter(c => c.status === 'New').length;
    const interviewCandidates = candidates.filter(c => c.status === 'Interview').length;

    return [
      { 
        title: "Toplam Aday", 
        value: totalCandidates, 
        icon: 'users', 
        change: { isPositive: true, value: 0 }
      },
      { 
        title: "Yeni Başvurular", 
        value: newCandidates, 
        icon: 'user-plus',
        change: { isPositive: true, value: 0 }
      },
      { 
        title: "Toplam Kategori", 
        value: totalCategories, 
        icon: 'folder',
        change: { isPositive: true, value: 0 }
      },
      { 
        title: "Mülakat Aşaması", 
        value: interviewCandidates, 
        icon: 'clipboard-list',
        change: { isPositive: true, value: 0 }
      },
    ];
  }, [candidates, categories]);

  const latestCandidates = useMemo(() => {
    return [...candidates]
      .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())
      .slice(0, 5);
  }, [candidates]);


  if (candidatesLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-full text-lg text-gray-600">
        Veriler yükleniyor...
      </div>
    );
  }

  if (candidatesError || categoriesError) {
    return (
      <div className="flex justify-center items-center h-full text-lg text-red-600">
        Veriler çekilirken bir hata oluştu: {candidatesError?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Anasayfa</h1>
        <p className="text-gray-500 mt-1">İK Yönetim Paneline Hoşgeldiniz</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  {iconMap[stat.icon]}
                </div>
              </div>
              {stat.change && (
                <div className="flex items-center mt-4">
                  {stat.change.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span 
                    className={`text-xs font-medium ${
                      stat.change.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change.isPositive ? '+' : '-'}{Math.abs(stat.change.value)}% Geçen Aya Oran
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sadece Recent Candidates bölümünü tutmak için grid yapısını güncelliyoruz */}
      {/* Artık sağ tarafta Recent Activity olmayacağı için, Recent Candidates tüm genişliği kaplayabilir. */}
      <div className="grid grid-cols-1 gap-6"> 
        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Son Başvurular</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>İsim Soyisim</TableHeader>
                  <TableHeader>Pozisyon</TableHeader>
                  <TableHeader>Kategori</TableHeader>
                  <TableHeader>Durum</TableHeader>
                  <TableHeader>Yükleme Tarihi</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestCandidates.length > 0 ? (
                  latestCandidates.map(candidate => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium text-gray-900">{candidate.candidate_name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>{candidate.category}</TableCell>
                      <TableCell>
                        {candidate.status ? (
                          <span className={`badge badge-${candidate.status.toLowerCase()}`}>
                            {candidate.status}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>

                      <TableCell>{formatDate(candidate.uploaded_at)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      Henüz yeni aday bulunmamaktadır.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Feed bölümü tamamen KALDIRILDI */}
        {/*
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time} by {activity.user}</p>
                  </div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                 <p className="text-center py-4 text-gray-500">Henüz bir aktivite bulunmamaktadır.</p>
              )}
            </div>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
};

export default Dashboard;