import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../types';
import Button from './Button';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{lesson.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">By {lesson.author}</p>
        <p className="text-slate-700 dark:text-slate-300 mb-4">{lesson.description}</p>
        <div className="flex justify-end space-x-2">
            <Link to={`/builder/${lesson.id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Link to={`/player/${lesson.id}`}>
              <Button>Start Lesson</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
