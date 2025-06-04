export interface Candidate {
  id: string;
  name: string;
  position: string;
  uploadedDate: string;
  category: string;
  fileUrl: string;
  notes?: string;
  aiData?: {
    linkedIn?: string;
    experience?: string;
    skills?: string[];
    education?: string[];
    contactInfo?: {
      email?: string;
      phone?: string;
      location?: string;
    };
    socialMedia?: {
      twitter?: string;
      github?: string;
      portfolio?: string;
    };
    summary?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  count: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface DashboardStat {
  title: string;
  value: number | string;
  icon: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export interface RecentActivity {
  id: string;
  action: string;
  user: string;
  time: string;
  details: string;
}

export interface AISearchResult {
  candidateId: string;
  candidateName: string;
  searchType: 'contact' | 'social' | 'summary';
  results: {
    [key: string]: string;
  };
  timestamp: string;
}