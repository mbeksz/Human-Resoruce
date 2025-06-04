import { Candidate, Category, DashboardStat, RecentActivity, User } from '../types';
import { formatDistanceToNow } from 'date-fns';

// Current user
export const currentUser: User = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
  role: 'HR Manager'
};

// Mock categories
export const categories: Category[] = [
  { id: '1', name: 'Software Development', description: 'Engineering roles focused on software development', count: 12 },
  { id: '2', name: 'Design', description: 'UI/UX and graphic design positions', count: 8 },
  { id: '3', name: 'Marketing', description: 'Digital and traditional marketing roles', count: 5 },
  { id: '4', name: 'Sales', description: 'B2B and B2C sales positions', count: 7 },
  { id: '5', name: 'Finance', description: 'Accounting and financial analysis roles', count: 3 },
];

// Generate random dates within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.setDate(now.getDate() - daysAgo));
  return date.toISOString();
};

// Mock candidates
export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    position: 'Frontend Developer',
    uploadedDate: getRandomDate(),
    category: 'Software Development',
    fileUrl: '/files/resume_1.pdf',
    notes: 'Strong React experience'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    position: 'UI/UX Designer',
    uploadedDate: getRandomDate(),
    category: 'Design',
    fileUrl: '/files/resume_2.pdf',
    notes: 'Excellent portfolio'
  },
  {
    id: '3',
    name: 'Michael Brown',
    position: 'Backend Developer',
    uploadedDate: getRandomDate(),
    category: 'Software Development',
    fileUrl: '/files/resume_3.pdf'
  },
  {
    id: '4',
    name: 'Emily Davis',
    position: 'Marketing Manager',
    uploadedDate: getRandomDate(),
    category: 'Marketing',
    fileUrl: '/files/resume_4.pdf',
    notes: '5+ years experience'
  },
  {
    id: '5',
    name: 'David Wilson',
    position: 'Sales Representative',
    uploadedDate: getRandomDate(),
    category: 'Sales',
    fileUrl: '/files/resume_5.pdf'
  },
  {
    id: '6',
    name: 'Jessica Martinez',
    position: 'Financial Analyst',
    uploadedDate: getRandomDate(),
    category: 'Finance',
    fileUrl: '/files/resume_6.pdf'
  },
  {
    id: '7',
    name: 'Ryan Taylor',
    position: 'Product Manager',
    uploadedDate: getRandomDate(),
    category: 'Software Development',
    fileUrl: '/files/resume_7.pdf',
    notes: 'Transitioning from development'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    position: 'Graphic Designer',
    uploadedDate: getRandomDate(),
    category: 'Design',
    fileUrl: '/files/resume_8.pdf'
  }
];

// Mock dashboard stats
export const dashboardStats: DashboardStat[] = [
  { title: 'Toplam Başvuru', value: candidates.length, icon: 'users', change: { value: 12, isPositive: true } },
  { title: 'Bu Hafta', value: 3, icon: 'user-plus', change: { value: 5, isPositive: false } },
  { title: 'Aktif Kategori', value: categories.length, icon: 'folder', change: { value: 0, isPositive: true } },
  { title: 'Bekleyen İnceleme', value: 5, icon: 'clipboard-list', change: { value: 2, isPositive: true } }
];

// Mock recent activities
export const recentActivities: RecentActivity[] = [
  {
    id: '1',
    action: 'Uploaded CV',
    user: 'John Doe',
    time: formatDistanceToNow(new Date(new Date().setHours(new Date().getHours() - 2)), { addSuffix: true }),
    details: 'Uploaded Alex Johnson\'s CV for Frontend Developer position'
  },
  {
    id: '2',
    action: 'Added Category',
    user: 'Jane Smith',
    time: formatDistanceToNow(new Date(new Date().setHours(new Date().getHours() - 5)), { addSuffix: true }),
    details: 'Created new category "Data Science"'
  },
  {
    id: '3',
    action: 'Reviewed CV',
    user: 'John Doe',
    time: formatDistanceToNow(new Date(new Date().setDate(new Date().getDate() - 1)), { addSuffix: true }),
    details: 'Reviewed Sarah Williams\'s application for UI/UX Designer'
  },
  {
    id: '4',
    action: 'Updated Settings',
    user: 'Admin',
    time: formatDistanceToNow(new Date(new Date().setDate(new Date().getDate() - 2)), { addSuffix: true }),
    details: 'Updated email notification settings'
  },
  {
    id: '5',
    action: 'Deleted CV',
    user: 'Jane Smith',
    time: formatDistanceToNow(new Date(new Date().setDate(new Date().getDate() - 3)), { addSuffix: true }),
    details: 'Removed expired application for Marketing position'
  }
];