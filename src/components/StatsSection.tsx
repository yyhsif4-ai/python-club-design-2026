import { Users, Award, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Активных студентов",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Курсов и модулей",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    value: "1,200+",
    label: "Завершенных проектов",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Успешного трудоустройства",
    color: "from-yellow-500 to-orange-500",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Результаты, которые <span className="gradient-text">говорят</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Наше сообщество растет каждый день, и каждый студент — это история успеха
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

                <div className="relative glass rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 border border-border/50 hover:border-primary/30">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-4`}>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl font-extrabold mb-2 gradient-text">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-foreground/70">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
