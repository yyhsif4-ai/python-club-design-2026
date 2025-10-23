-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('user', 'editor', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  preview_text TEXT,
  category TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create test_results table
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  earnings DECIMAL(10, 2) DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Create view_history table
CREATE TABLE public.view_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.view_history ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile and role on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for courses
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published' OR public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can create courses"
  ON public.courses FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can update courses"
  ON public.courses FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for lessons
CREATE POLICY "Anyone can view lessons of published courses"
  ON public.lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = lessons.course_id
      AND (courses.status = 'published' OR public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Editors can manage lessons"
  ON public.lessons FOR ALL
  USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for test_results
CREATE POLICY "Users can view own test results"
  ON public.test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON public.test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all test results"
  ON public.test_results FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for view_history
CREATE POLICY "Users can view own history"
  ON public.view_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON public.view_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();