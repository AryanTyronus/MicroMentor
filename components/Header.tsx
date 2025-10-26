import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Button from './Button';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link 
          to="/dashboard"
          className="text-2xl font-bold text-violet-600 dark:text-violet-400 cursor-pointer"
        >
          MicroMentor
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            to="/dashboard"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors hidden sm:block"
          >
            Dashboard
          </Link>
          <Button onClick={() => navigate('/builder')}>
            Create Lesson
          </Button>
          <img 
            src="https://i.pravatar.cc/40?u=a042581f4e29026704d" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full"
          />
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
