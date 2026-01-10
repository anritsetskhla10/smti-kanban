'use client';

import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Plus, LayoutDashboard, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderProps {
  onNewInquiry: () => void;
}

export const Header = ({ onNewInquiry }: HeaderProps) => {
  const { theme, toggleTheme, density, toggleDensity } = useUIStore();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
      {/* Logo / Title Area */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <LayoutDashboard className="w-6 h-6" />
        </div>
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Inquiries
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Manage your event requests
            </p>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-3 self-end md:self-auto bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        
        {/* Theme Toggles Group */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 p-1 rounded-xl">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme} 
                className="w-8 h-8 p-0 rounded-lg hover:bg-white dark:hover:bg-gray-600 shadow-sm transition-all"
            >
                {theme === 'light' ? <Moon className="w-4 h-4"/> : <Sun className="w-4 h-4"/>}
            </Button>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleDensity} 
                className="w-8 h-8 p-0 rounded-lg hover:bg-white dark:hover:bg-gray-600 shadow-sm transition-all"
            >
                {density === 'comfortable' ? <Minimize2 className="w-4 h-4"/> : <Maximize2 className="w-4 h-4"/>}
            </Button>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* Primary Action */}
        <Button 
            onClick={onNewInquiry}
            className="gap-2 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
        >
            <Plus className="w-4 h-4" />
            <span className="font-semibold">New Inquiry</span>
        </Button>
      </div>
    </div>
  );
};