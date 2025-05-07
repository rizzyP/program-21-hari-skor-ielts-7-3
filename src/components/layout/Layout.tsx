
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, CheckSquare, BarChart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className
}) => {
  return <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img alt="Program 21 Hari Skor IELTS 7.0" className="h-10" src="/lovable-uploads/19d179ae-72af-42a9-9de5-99d2bba39be7.png" />
          </Link>
          <nav className="flex gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link to="/curriculum">
              <Button variant="ghost" size="sm">Curriculum</Button>
            </Link>
            <Link to="/test">
              <Button variant="ghost" size="sm">Take Test</Button>
            </Link>
            <Link to="/results">
              <Button variant="ghost" size="sm">Results</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className={cn("flex-1 container mx-auto px-4 py-6", className)}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          Program 21 Hari Skor IELTS 7.0 © {new Date().getFullYear()} - Powered by AI
        </div>
      </footer>
    </div>;
};

export default Layout;
