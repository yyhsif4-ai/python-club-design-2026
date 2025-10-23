import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    preview_text: '',
    category: '',
    cover_image_url: '',
    price: 0,
    status: 'draft' as 'draft' | 'published',
  });

  useEffect(() => {
    if (!isNew) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          description: data.description || '',
          preview_text: data.preview_text || '',
          category: data.category || '',
          cover_image_url: data.cover_image_url || '',
          price: data.price || 0,
          status: data.status as 'draft' | 'published',
        });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яa-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      const slug = formData.slug || generateSlug(formData.title);
      const courseData = {
        ...formData,
        slug,
        status,
        author_id: user?.id,
      };

      if (isNew) {
        const { error } = await supabase.from('courses').insert(courseData);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', id);
        if (error) throw error;
      }

      toast({
        title: status === 'published' ? 'Курс опубликован' : 'Черновик сохранен',
        description: 'Изменения успешно сохранены.',
      });

      navigate('/admin/courses');
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {isNew ? 'Создание курса' : 'Редактирование курса'}
            </h1>
            <p className="text-muted-foreground">
              Заполните информацию о курсе
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave('draft')}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить черновик
            </Button>
            <Button variant="hero" onClick={() => handleSave('published')}>
              <Eye className="w-4 h-4 mr-2" />
              Опубликовать
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Название курса *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Python для начинающих"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL (slug)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="python-basics"
                  />
                  <p className="text-xs text-muted-foreground">
                    Оставьте пустым для автоматической генерации
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Полное описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Подробное описание курса..."
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preview_text">Краткое описание</Label>
                  <Textarea
                    id="preview_text"
                    value={formData.preview_text}
                    onChange={(e) => setFormData({ ...formData, preview_text: e.target.value })}
                    placeholder="Короткий текст для карточки курса"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="automation">Автоматизация</SelectItem>
                      <SelectItem value="beginner">Для новичков</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image_url">URL обложки</Label>
                  <Input
                    id="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
