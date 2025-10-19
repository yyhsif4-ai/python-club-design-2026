import { Code2, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Python Club</span>
            </div>
            <p className="text-foreground/60 mb-4 max-w-md">
              Образовательная платформа нового поколения. Учитесь программировать эффективно, 
              практически и с удовольствием.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <a href="#courses" className="text-foreground/60 hover:text-primary transition-colors">
                  Все курсы
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/60 hover:text-primary transition-colors">
                  О платформе
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-foreground/60 hover:text-primary transition-colors">
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#faq" className="text-foreground/60 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <a href="#help" className="text-foreground/60 hover:text-primary transition-colors">
                  Центр помощи
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/60 hover:text-primary transition-colors">
                  Связаться с нами
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-foreground/60 hover:text-primary transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#terms" className="text-foreground/60 hover:text-primary transition-colors">
                  Условия использования
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © 2026 Python Club. Все права защищены.
          </p>
          <p className="text-sm text-foreground/60">
            Создано с ❤️ для тех, кто любит код
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
