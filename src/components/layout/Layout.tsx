
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, CheckSquare, BarChart, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { user, signOut } = useAuth();

  // Get initials from user email for avatar fallback
  const getInitials = () => {
    if (!user?.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8d02e6fa-0b79-4eb4-899d-89e9e234c524.png" 
              alt="Program 21 Hari IELTS 7.0 Logo" 
              className="h-8 sm:h-10" 
            />
          </Link>
          <nav className="flex gap-2 items-center">
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
            
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
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
          Program 21 Hari Skor IELTS 7.0 © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
