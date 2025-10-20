import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award, Calendar, Hash, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const certificates = {
  "a1b2c3d4e5f6": {
    studentName: "Иван Петров",
    course: "Python для начинающих",
    issueDate: "2024-10-15",
    hash: "a1b2c3d4e5f6",
    averageScore: 95,
    completionRate: 100,
    practiceTasksCompleted: 42,
    totalPracticeTasks: 42,
    timeSpent: "48 часов"
  }
};

export default function Certificate() {
  const { hash } = useParams();
  
  const certificate = certificates[hash as keyof typeof certificates];

  if (!certificate) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Verification Success Banner */}
          <div className="mb-8 p-6 rounded-lg bg-success/10 border border-success/20 flex items-center gap-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-success flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-success mb-1">Сертификат подтвержден</h2>
              <p className="text-muted-foreground">
                Этот сертификат действителен и выдан Python Club
              </p>
            </div>
          </div>

          {/* Certificate Display */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-gradient-primary p-8 text-primary-foreground">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Сертификат о прохождении курса</h1>
                <p className="text-lg opacity-90">Python Club</p>
              </div>
            </div>
            
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <p className="text-muted-foreground mb-2">Настоящий сертификат подтверждает, что</p>
                <h2 className="text-4xl font-bold mb-4 gradient-text">{certificate.studentName}</h2>
                <p className="text-muted-foreground mb-2">успешно завершил(а) курс</p>
                <h3 className="text-2xl font-semibold mb-6">{certificate.course}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Дата выдачи</p>
                    <p className="font-semibold">
                      {new Date(certificate.issueDate).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Уникальный ID</p>
                    <p className="font-mono font-semibold">{certificate.hash}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Показатели успешности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Средний балл за практические задания</span>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    {certificate.averageScore}/100
                  </Badge>
                </div>
                <Progress value={certificate.averageScore} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Процент завершения курса</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {certificate.completionRate}%
                  </Badge>
                </div>
                <Progress value={certificate.completionRate} className="h-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="p-4 rounded-lg bg-accent/20">
                  <p className="text-sm text-muted-foreground mb-1">Практических заданий выполнено</p>
                  <p className="text-2xl font-bold">
                    {certificate.practiceTasksCompleted}/{certificate.totalPracticeTasks}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-accent/20">
                  <p className="text-sm text-muted-foreground mb-1">Время обучения</p>
                  <p className="text-2xl font-bold">{certificate.timeSpent}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Этот сертификат подтверждает не только прохождение курса, но и высокое качество 
                  приобретенных навыков. Студент демонстрирует глубокое понимание материала и 
                  способность применять полученные знания на практике.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Info */}
          <div className="mt-8 p-4 rounded-lg bg-accent/20 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p>
              Проверить подлинность этого сертификата можно по ссылке: 
              <span className="font-mono ml-2 text-foreground">
                pythonclub.com/certificate/{certificate.hash}
              </span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
