import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import CoursesGrid from "@/components/CoursesGrid";
import StatsSection from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CoursesGrid />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
