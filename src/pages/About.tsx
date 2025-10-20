import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 gradient-text">О Python Club</h1>
            <p className="text-xl text-muted-foreground">
              Мы меняем подход к обучению программированию
            </p>
          </div>

          <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Python Club — это современная образовательная платформа, которая делает обучение 
                программированию не только эффективным, но и мотивирующим. Мы верим, что каждый 
                может стать программистом, если у него есть правильные инструменты и мотивация.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Наша уникальная система вознаграждений позволяет студентам зарабатывать виртуальные 
                баллы за выполнение практических заданий, которые можно использовать для оплаты 
                следующих курсов. Это создает экосистему непрерывного обучения и роста.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Практико-ориентированность</h3>
                <p className="text-muted-foreground">
                  80% времени студенты проводят за написанием реального кода. Каждый урок 
                  включает практические задания с немедленной проверкой и обратной связью.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.25s" }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Мотивация через действие</h3>
                <p className="text-muted-foreground">
                  Система вознаграждений превращает обучение в увлекательный процесс. Каждое 
                  выполненное задание приносит реальные баллы, которые можно потратить на новые знания.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Профессиональное сообщество</h3>
                <p className="text-muted-foreground">
                  Наши курсы создают практикующие разработчики из ведущих IT-компаний. 
                  Вы учитесь не просто писать код, а решать реальные бизнес-задачи.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Признание достижений</h3>
                <p className="text-muted-foreground">
                  После успешного завершения курса вы получаете верифицируемый сертификат, 
                  который подтверждает не только прохождение, но и качество ваших навыков.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-primary text-primary-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Наша методология</h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="text-left">
                  <h4 className="font-semibold mb-2">1. Изучение теории (20%)</h4>
                  <p className="text-primary-foreground/80">
                    Короткие видеоуроки и текстовые материалы объясняют концепции простым языком.
                  </p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold mb-2">2. Практика (60%)</h4>
                  <p className="text-primary-foreground/80">
                    Интерактивные задания в встроенном редакторе с мгновенной проверкой решений.
                  </p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold mb-2">3. Проекты (20%)</h4>
                  <p className="text-primary-foreground/80">
                    Создание реальных приложений, которые можно добавить в портфолио.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
