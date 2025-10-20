import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
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
        <Link to="/courses" className="text-foreground/80 hover:text-primary transition-colors">
          Курсы
        </Link>
        <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
          О нас
        </Link>
        <Link to="/recommendations" className="text-foreground/80 hover:text-primary transition-colors">
          Рекомендации
        </Link>
      </nav>

      {/* Login Button */}
      <Link to="/dashboard">
        <Button variant="outline" size="sm">
          Войти
        </Button>
      </Link>
    </div>
  </div>
</header>
);
};
