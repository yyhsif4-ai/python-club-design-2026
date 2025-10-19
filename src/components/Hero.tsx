import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import InteractiveCodeBlock from "./InteractiveCodeBlock";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center dark-space">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Python Club 2026</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Код, который <span className="gradient-text">работает</span>.
            </h1>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight">
              Навыки, которые <span className="gradient-text">остаются</span>.
            </h1>

            <p className="text-xl text-foreground/70 mb-10 max-w-xl">
              Интерактивные курсы по Python, которые сделают из вас профессионала.
              Практика, проекты, менторство — всё что нужно для реального роста.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Выбрать курс
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Узнать больше
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-foreground/60">
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">2,500+</div>
                <div>Выпускников</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">95%</div>
                <div>Довольных студентов</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">24/7</div>
                <div>Поддержка</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Code Block */}
          <div className="animate-scale-in">
            <InteractiveCodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
