import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Clock, Target, Brain, Coffee, Users } from "lucide-react";

const tips = [
  {
    icon: Clock,
    title: "Учитесь регулярно",
    description: "Лучше заниматься 30 минут каждый день, чем 5 часов раз в неделю. Постоянство — ключ к успеху в программировании.",
    color: "primary"
  },
  {
    icon: Target,
    title: "Ставьте конкретные цели",
    description: "Не просто \"выучить Python\", а \"создать веб-приложение\" или \"автоматизировать рутинную задачу\". Конкретные цели мотивируют лучше.",
    color: "success"
  },
  {
    icon: Brain,
    title: "Практикуйтесь активно",
    description: "Не просто смотрите видео — пишите код сами. Ошибки и их исправление — важная часть обучения. Чем больше кода вы напишете, тем лучше.",
    color: "primary"
  },
  {
    icon: Coffee,
    title: "Делайте перерывы",
    description: "Метод Pomodoro (25 минут работы, 5 минут отдыха) помогает сохранить концентрацию. Уставший мозг учится хуже.",
    color: "success"
  },
  {
    icon: Users,
    title: "Общайтесь с другими",
    description: "Объясняя код другим, вы лучше его понимаете сами. Присоединяйтесь к сообществам разработчиков, задавайте вопросы.",
    color: "primary"
  },
  {
    icon: Lightbulb,
    title: "Создавайте проекты",
    description: "Как только изучили основы — начинайте создавать что-то своё. Реальные проекты дают бесценный опыт и мотивацию.",
    color: "success"
  }
];

export default function Recommendations() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 gradient-text">Рекомендации по обучению</h1>
            <p className="text-xl text-muted-foreground">
              Проверенные советы для эффективного изучения программирования
            </p>
          </div>

          <Card className="mb-8 bg-gradient-primary text-primary-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Главное правило</h2>
              <p className="text-lg leading-relaxed">
                Программирование — это навык, как езда на велосипеде или игра на музыкальном 
                инструменте. Невозможно научиться только читая или смотря видео. Нужно писать код. 
                Много кода. Каждый день.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 mb-8">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-card/50 backdrop-blur-sm hover:scale-[1.02] transition-all animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        tip.color === 'primary' ? 'bg-primary/10' : 'bg-success/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          tip.color === 'primary' ? 'text-primary' : 'text-success'
                        }`} />
                      </div>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <CardHeader>
              <CardTitle>Как использовать систему баллов Python Club</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">За что начисляются баллы?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Правильное решение практических заданий</li>
                  <li>Завершение уроков и модулей</li>
                  <li>Прохождение тестов</li>
                  <li>Создание учебных проектов</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Как потратить баллы?</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Оплата до 50% стоимости любого курса</li>
                  <li>Доступ к дополнительным материалам</li>
                  <li>Участие в мастер-классах</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground italic">
                  Совет: Не спешите тратить баллы сразу. Накопите их и используйте для 
                  оплаты продвинутых курсов — это максимизирует вашу выгоду.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
