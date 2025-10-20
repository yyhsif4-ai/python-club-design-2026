import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Coins, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const activityData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (364 - i));
  return {
    date: date.toISOString().split('T')[0],
    earnings: Math.random() > 0.7 ? Math.floor(Math.random() * 500) : 0
  };
});

const myCourses = [
  {
    id: 1,
    slug: "python-basics",
    title: "Python для начинающих",
    progress: 45,
    totalLessons: 42,
    completedLessons: 19,
    earnings: 2850
  },
  {
    id: 2,
    slug: "django-advanced",
    title: "Django: Продвинутая разработка",
    progress: 15,
    totalLessons: 56,
    completedLessons: 8,
    earnings: 960
  }
];

const certificates = [
  {
    id: 1,
    hash: "a1b2c3d4e5f6",
    course: "Основы Python",
    date: "2024-10-15",
    score: 95
  }
];

export default function Dashboard() {
  const getIntensity = (earnings: number) => {
    if (earnings === 0) return "bg-accent/20";
    if (earnings < 100) return "bg-success/20";
    if (earnings < 300) return "bg-success/40";
    if (earnings < 500) return "bg-success/60";
    return "bg-success";
  };

  const totalEarnings = myCourses.reduce((acc, course) => acc + course.earnings, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                <AvatarFallback>СТ</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Студент Python Club</h1>
                <p className="text-muted-foreground mb-4">ID: USER12345</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                    <Coins className="w-5 h-5 text-success" />
                    <div>
                      <div className="text-2xl font-bold text-success">{totalEarnings.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-xs text-muted-foreground">Баланс</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{myCourses.length}</div>
                      <div className="text-xs text-muted-foreground">Активных курсов</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 border border-border">
                    <Award className="w-5 h-5 text-foreground" />
                    <div>
                      <div className="text-2xl font-bold">{certificates.length}</div>
                      <div className="text-xs text-muted-foreground">Сертификатов</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Graph */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              График активности
            </CardTitle>
            <CardDescription>Ваши заработанные баллы за последний год</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto pb-4">
              <div className="inline-grid grid-cols-[repeat(53,1fr)] gap-1 min-w-[800px]">
                {activityData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${getIntensity(day.earnings)} transition-all hover:scale-125 hover:ring-2 hover:ring-primary cursor-pointer`}
                    title={`${day.date}: ${day.earnings} ₽`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <span>Меньше</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-accent/20" />
                <div className="w-3 h-3 rounded-sm bg-success/20" />
                <div className="w-3 h-3 rounded-sm bg-success/40" />
                <div className="w-3 h-3 rounded-sm bg-success/60" />
                <div className="w-3 h-3 rounded-sm bg-success" />
              </div>
              <span>Больше</span>
            </div>
          </CardContent>
        </Card>

        {/* My Courses */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Мои курсы</CardTitle>
            <CardDescription>Курсы, которые вы сейчас проходите</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.slug}`}>
                <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:glow-primary cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.completedLessons} из {course.totalLessons} уроков
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      +{course.earnings} ₽
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{course.progress}% завершено</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Мои сертификаты
            </CardTitle>
            <CardDescription>Сертификаты об успешном завершении курсов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {certificates.map((cert) => (
              <Link key={cert.id} to={`/certificate/${cert.hash}`}>
                <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:glow-primary cursor-pointer flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{cert.course}</h3>
                    <p className="text-sm text-muted-foreground">
                      Выдан: {new Date(cert.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{cert.score}/100</div>
                    <p className="text-xs text-muted-foreground">Средний балл</p>
                  </div>
                </div>
              </Link>
            ))}
            
            {certificates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Пока нет сертификатов</p>
                <p className="text-sm">Завершите курс, чтобы получить сертификат</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
