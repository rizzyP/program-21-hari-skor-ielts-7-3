
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  BarChart, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
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
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-2">
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
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                      <AvatarFallback>{getInitials(user.email || "")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-10">
        <div className="flex justify-around p-2">
          <Link to="/" className="flex flex-col items-center p-2">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/curriculum" className="flex flex-col items-center p-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Curriculum</span>
          </Link>
          <Link to="/test" className="flex flex-col items-center p-2">
            <CheckSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Test</span>
          </Link>
          <Link to="/results" className="flex flex-col items-center p-2">
            <BarChart className="h-5 w-5" />
            <span className="text-xs mt-1">Results</span>
          </Link>
        </div>
      </div>

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
