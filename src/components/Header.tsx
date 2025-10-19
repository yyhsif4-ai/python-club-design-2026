import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Python Club</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-foreground/80 hover:text-primary transition-colors">
              Курсы
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
              О нас
            </a>
            <a href="#recommendations" className="text-foreground/80 hover:text-primary transition-colors">
              Рекомендации
            </a>
          </nav>

          {/* Login Button */}
          <Button variant="outline" size="sm">
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
