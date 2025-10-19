import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Rocket, Brain, Zap, Database, Globe } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Python для начинающих",
    level: "Для новичков",
    description: "Освойте основы программирования с нуля. Переменные, циклы, функции и ООП.",
    icon: Code,
    earnings: "Заработайте до 3,000 ₽",
    duration: "8 недель",
    color: "from-blue-500 to-cyan-500",
    size: "large",
  },
  {
    id: 2,
    title: "Django Web Development",
    level: "Средний уровень",
    description: "Создавайте мощные веб-приложения с Django. От API до full-stack проектов.",
    icon: Globe,
    earnings: "Заработайте до 7,000 ₽",
    duration: "10 недель",
    color: "from-green-500 to-emerald-500",
    size: "medium",
  },
  {
    id: 3,
    title: "Data Science & ML",
    level: "Продвинутый",
    description: "Машинное обучение, анализ данных, нейронные сети и AI.",
    icon: Brain,
    earnings: "Заработайте до 10,000 ₽",
    duration: "12 недель",
    color: "from-purple-500 to-pink-500",
    size: "large",
  },
  {
    id: 4,
    title: "FastAPI & Async Python",
    level: "Средний уровень",
    description: "Высокопроизводительные API с асинхронным программированием.",
    icon: Zap,
    earnings: "Заработайте до 6,000 ₽",
    duration: "6 недель",
    color: "from-yellow-500 to-orange-500",
    size: "small",
  },
  {
    id: 5,
    title: "Python для автоматизации",
    level: "Для новичков",
    description: "Автоматизируйте рутину: скрипты, боты, парсинг данных.",
    icon: Rocket,
    earnings: "Заработайте до 4,000 ₽",
    duration: "5 недель",
    color: "from-indigo-500 to-blue-500",
    size: "small",
  },
  {
    id: 6,
    title: "Работа с базами данных",
    level: "Средний уровень",
    description: "SQL, PostgreSQL, MongoDB и ORM. Проектируйте эффективные БД.",
    icon: Database,
    earnings: "Заработайте до 5,500 ₽",
    duration: "7 недель",
    color: "from-red-500 to-rose-500",
    size: "medium",
  },
];

const CoursesGrid = () => {
  return (
    <section id="courses" className="dark-space">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-4">
            Выберите свой <span className="gradient-text">путь</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            От новичка до профессионала. Каждый курс — это практический проект в портфолио.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {courses.map((course, index) => {
            const Icon = course.icon;
            const gridClass =
              course.size === "large"
                ? "md:col-span-2"
                : course.size === "medium"
                ? "md:col-span-1 lg:col-span-1"
                : "md:col-span-1";

            return (
              <Card
                key={course.id}
                className={`${gridClass} group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-scale-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon & Level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${course.color} bg-opacity-10`}>
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {course.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-foreground/70 mb-6 flex-grow">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-success font-semibold">{course.earnings}</span>
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>

                  {/* CTA */}
                  <Button variant="ghost" className="w-full group/btn justify-between">
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Смотреть все курсы
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
