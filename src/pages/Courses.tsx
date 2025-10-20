import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, BookOpen, Code2, Database, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    slug: "python-basics",
    title: "Python для начинающих",
    description: "Изучите основы Python с нуля. Переменные, циклы, функции и объектно-ориентированное программирование.",
    price: 15000,
    level: "beginner",
    category: "backend",
    rating: 4.9,
    lessons: 42,
    icon: Code2,
    earnings: "до 5,000 ₽"
  },
  {
    id: 2,
    slug: "django-advanced",
    title: "Django: Продвинутая разработка",
    description: "Создайте полноценные веб-приложения с Django. REST API, аутентификация, деплой.",
    price: 25000,
    level: "advanced",
    category: "backend",
    rating: 4.8,
    lessons: 56,
    icon: Code2,
    earnings: "до 12,000 ₽"
  },
  {
    id: 3,
    slug: "data-science-intro",
    title: "Data Science с Python",
    description: "Анализ данных, визуализация, машинное обучение. Pandas, NumPy, Scikit-learn.",
    price: 20000,
    level: "intermediate",
    category: "data-science",
    rating: 4.9,
    lessons: 48,
    icon: Database,
    earnings: "до 8,000 ₽"
  },
  {
    id: 4,
    slug: "automation-testing",
    title: "Автоматизация и тестирование",
    description: "Selenium, pytest, автоматизация рутинных задач. Практические проекты.",
    price: 18000,
    level: "intermediate",
    category: "automation",
    rating: 4.7,
    lessons: 36,
    icon: Cpu,
    earnings: "до 6,000 ₽"
  },
  {
    id: 5,
    slug: "fastapi-microservices",
    title: "FastAPI: Микросервисы",
    description: "Современная разработка API с FastAPI. Асинхронность, Docker, микросервисная архитектура.",
    price: 22000,
    level: "advanced",
    category: "backend",
    rating: 4.9,
    lessons: 52,
    icon: Code2,
    earnings: "до 10,000 ₽"
  },
  {
    id: 6,
    slug: "ml-deep-learning",
    title: "Глубокое обучение",
    description: "Нейронные сети, TensorFlow, PyTorch. От теории к практике.",
    price: 30000,
    level: "advanced",
    category: "data-science",
    rating: 4.8,
    lessons: 64,
    icon: Database,
    earnings: "до 15,000 ₽"
  }
];

const levelLabels = {
  beginner: "Новичок",
  intermediate: "Средний",
  advanced: "Продвинутый"
};

const categoryLabels = {
  backend: "Backend",
  "data-science": "Data Science",
  automation: "Автоматизация"
};

export default function Courses() {
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredCourses = courses.filter(course => {
    const levelMatch = levelFilter === "all" || course.level === levelFilter;
    const categoryMatch = categoryFilter === "all" || course.category === categoryFilter;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Каталог курсов</h1>
          <p className="text-xl text-muted-foreground">
            Выберите курс и начните зарабатывать на практике
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="w-full sm:w-auto">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Уровень" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="beginner">Новичок</SelectItem>
                <SelectItem value="intermediate">Средний</SelectItem>
                <SelectItem value="advanced">Продвинутый</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Направление" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все направления</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="automation">Автоматизация</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-muted-foreground flex items-center ml-auto">
            Найдено курсов: <span className="ml-2 font-bold text-foreground">{filteredCourses.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card 
                key={course.id} 
                className="group hover:scale-105 transition-all duration-300 hover:shadow-xl hover:glow-primary bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{levelLabels[course.level as keyof typeof levelLabels]}</Badge>
                    <Badge variant="outline">{categoryLabels[course.category as keyof typeof categoryLabels]}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.lessons} уроков
                      </span>
                    </div>
                    
                    <div className="text-success font-semibold">
                      Заработайте {course.earnings} на практике
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{course.price.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-xs text-muted-foreground">до 50% баллами</div>
                  </div>
                  <Link to={`/course/${course.slug}`}>
                    <Button variant="hero" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Подробнее
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
