import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Lesson } from './types';
import { MOCK_LESSONS } from './constants';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import LessonDashboardView from './views/LessonDashboardView';
import LessonBuilderView from './views/LessonBuilderView';
import LessonPlayerView from './views/LessonPlayerView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { session } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const navigate = useNavigate();

  const handleSaveLesson = useCallback((lesson: Lesson) => {
    setLessons(prevLessons => {
      const existingIndex = prevLessons.findIndex(l => l.id === lesson.id);
      if (existingIndex !== -1) {
        const updatedLessons = [...prevLessons];
        updatedLessons[existingIndex] = lesson;
        return updatedLessons;
      }
      return [...prevLessons, lesson];
    });
    navigate('/dashboard');
  }, [navigate]);
  
  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      {session && <Header />}
      <main className={session ? "container mx-auto p-4 md:p-8" : ""}>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <LessonDashboardView lessons={lessons} />
            </ProtectedRoute>
          } />
          <Route path="/builder" element={
            <ProtectedRoute>
              <LessonBuilderView onSave={handleSaveLesson} lessons={lessons} />
            </ProtectedRoute>
          } />
          <Route path="/builder/:lessonId" element={
            <ProtectedRoute>
              <LessonBuilderView onSave={handleSaveLesson} lessons={lessons} />
            </ProtectedRoute>
          } />
          <Route path="/player/:lessonId" element={
            <ProtectedRoute>
              <LessonPlayerView lessons={lessons} />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to={session ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
