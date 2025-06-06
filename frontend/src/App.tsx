import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UploadCV from './pages/UploadCV';
import Categories from './pages/Categories';
import CandidateList from './pages/CandidateList';
import CandidateDetail from './pages/CandidateDetail';
import AISearch from './pages/AISearch';
import Settings from './pages/Settings';
import SentezChat from './pages/Sentez_ai';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadCV />} />
          <Route path="candidates" element={<CandidateList />} />
          <Route path="candidates/:id" element={<CandidateDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="ai-search" element={<AISearch />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sentez-ai" element={<SentezChat />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;