import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Code2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in-up max-w-2xl px-6">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
            <Code2 className="w-24 h-24 text-primary relative" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="mb-4 text-8xl font-extrabold gradient-text">404</h1>
        
        {/* Message */}
        <h2 className="mb-4 text-3xl font-bold">Страница не найдена</h2>
        <p className="mb-8 text-xl text-foreground/70">
          Похоже, вы наткнулись на несуществующий маршрут. Давайте вернем вас в безопасное место!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={() => window.location.href = "/"}>
            <Home className="w-5 h-5" />
            Вернуться на главную
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            Назад
          </Button>
        </div>

        {/* Fun message */}
        <p className="mt-12 text-sm text-muted-foreground font-mono">
          # Ошибка 404: import success from '{location.pathname}' failed
        </p>
      </div>
    </div>
  );
};

export default NotFound;
