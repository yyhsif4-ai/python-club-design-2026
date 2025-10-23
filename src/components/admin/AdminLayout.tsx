import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LayoutDashboard, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserMenu } from '../UserMenu';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Курсы', href: '/admin/courses', icon: BookOpen },
  { name: 'Пользователи', href: '/admin/users', icon: Users },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Python Club</span>
              <span className="text-sm text-muted-foreground ml-2">/ Admin</span>
            </Link>

            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border/50 bg-card/20 backdrop-blur-sm p-6">
          <nav className="space-y-2">
            {adminNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "hover:bg-accent text-foreground/80 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
