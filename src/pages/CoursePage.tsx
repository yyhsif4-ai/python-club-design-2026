import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Play, Code2 } from "lucide-react";
import { toast } from "sonner";

const courseLessons = {
  "python-basics": {
    title: "Python для начинающих",
    modules: [
      {
        id: 1,
        title: "Введение в Python",
        lessons: [
          { id: 1, title: "Установка и настройка", completed: true },
          { id: 2, title: "Первая программа", completed: true },
          { id: 3, title: "Переменные и типы данных", completed: false }
        ]
      },
      {
        id: 2,
        title: "Управляющие конструкции",
        lessons: [
          { id: 4, title: "Условные операторы", completed: false },
          { id: 5, title: "Циклы for и while", completed: false },
          { id: 6, title: "Практика: Калькулятор", completed: false }
        ]
      }
    ]
  }
};

export default function CoursePage() {
  const { courseSlug } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(3);
  const [code, setCode] = useState('# Создайте переменные для имени и возраста\n# Выведите их на экран\n\nname = "Студент"\nage = 20\nprint(f"Меня зовут {name}, мне {age} лет")');
  const [output, setOutput] = useState("");

  const course = courseLessons[courseSlug as keyof typeof courseLessons];

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.completed).length, 
    0
  );
  const progressPercent = (completedLessons / totalLessons) * 100;

  const handleCheckSolution = () => {
    setOutput("Меня зовут Студент, мне 20 лет");
    
    setTimeout(() => {
      toast.success("Отлично! +150 ₽ на ваш счет", {
        description: "Вы успешно завершили урок",
        duration: 5000,
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Sidebar - Navigation */}
        <aside className="w-80 border-r border-border bg-card/30 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <div className="space-y-2">
              <Progress value={progressPercent} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {completedLessons} из {totalLessons} уроков
              </p>
            </div>
          </div>

          <nav className="p-4">
            {course.modules.map((module) => (
              <div key={module.id} className="mb-6">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                  {module.title}
                </h3>
                <ul className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => setSelectedLesson(lesson.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                          selectedLesson === lesson.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-accent text-foreground"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="text-sm">{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-5xl mx-auto p-8">
            {/* Video/Theory Section */}
            <Card className="mb-8 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Урок 3: Переменные и типы данных
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Видео урок (12:34)</p>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Теория</h3>
                  <p className="text-muted-foreground mb-4">
                    В Python переменные используются для хранения данных. Вы можете создать переменную, 
                    присвоив ей значение с помощью оператора <code className="px-2 py-1 rounded bg-accent">=</code>
                  </p>
                  
                  <div className="bg-accent/20 p-4 rounded-lg font-mono text-sm mb-4">
                    <div className="text-success"># Примеры переменных</div>
                    <div>name = "Python"</div>
                    <div>age = 30</div>
                    <div>is_active = True</div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Python автоматически определяет тип данных переменной. Основные типы: 
                    строки (str), числа (int, float), логические значения (bool).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Practice Section */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-success" />
                  Практическое задание
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Задание: Создайте переменные и выведите их значения
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 p-4 rounded-lg bg-accent/20 border border-border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    spellCheck={false}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleCheckSolution} 
                    variant="hero"
                    className="flex-1"
                  >
                    Проверить решение
                  </Button>
                  <Button 
                    onClick={() => {
                      setCode('# Создайте переменные для имени и возраста\n# Выведите их на экран\n\n');
                      setOutput('');
                    }} 
                    variant="outline"
                  >
                    Сбросить
                  </Button>
                </div>

                {output && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Вывод консоли:</label>
                    <div className="p-4 rounded-lg bg-accent/20 border border-success font-mono text-sm">
                      {output}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
