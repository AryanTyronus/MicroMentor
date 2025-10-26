import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../types';
import LessonCard from '../components/LessonCard';
import Button from '../components/Button';
import { PlusIcon } from '../constants';

interface LessonDashboardProps {
  lessons: Lesson[];
}

const LessonDashboardView: React.FC<LessonDashboardProps> = ({ lessons }) => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Lessons</h1>
        <Button onClick={() => navigate('/builder')}>
          <span className="flex items-center space-x-2">
            <PlusIcon />
            <span>Create New Lesson</span>
          </span>
        </Button>
      </div>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold">No lessons yet!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-4">Click "Create New Lesson" to get started.</p>
          <Button onClick={() => navigate('/builder')}>Get Started</Button>
        </div>
      )}
    </div>
  );
};

export default LessonDashboardView;
