import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Calendar } from "lucide-react";

const profiles = {
  "student123": {
    name: "Иван Петров",
    username: "student123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student123",
    joinDate: "2024-01-15",
    completedCourses: 3,
    certificates: [
      { id: 1, course: "Python для начинающих", date: "2024-10-15" },
      { id: 2, course: "Django: Основы", date: "2024-11-20" }
    ],
    currentCourses: [
      { id: 1, title: "Django: Продвинутая разработка", progress: 45 }
    ]
  }
};

export default function Profile() {
  const { username } = useParams();
  
  const profile = profiles[username as keyof typeof profiles];

  if (!profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                  <p className="text-muted-foreground mb-4">@{profile.username}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        На платформе с {new Date(profile.joinDate).toLocaleDateString('ru-RU', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 justify-center md:justify-start">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{profile.completedCourses}</div>
                      <div className="text-sm text-muted-foreground">Завершено курсов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{profile.certificates.length}</div>
                      <div className="text-sm text-muted-foreground">Сертификатов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{profile.currentCourses.length}</div>
                      <div className="text-sm text-muted-foreground">В процессе</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Section */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Сертификаты
              </h2>
              
              <div className="space-y-3">
                {profile.certificates.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-4 rounded-lg border border-border bg-accent/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-semibold">{cert.course}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(cert.date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      Подтвержден
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Courses */}
          <Card className="bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Курсы в процессе
              </h2>
              
              <div className="space-y-3">
                {profile.currentCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="p-4 rounded-lg border border-border bg-accent/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{course.title}</p>
                      <Badge variant="secondary">{course.progress}%</Badge>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
