-- Create enum types
CREATE TYPE socio_economic_status AS ENUM ('low_income', 'middle_income', 'high_income');
CREATE TYPE education_level AS ENUM ('below_10th', '10th_pass', '12th_pass', 'diploma', 'graduate', 'postgraduate');
CREATE TYPE nsqf_level AS ENUM ('level_1', 'level_2', 'level_3', 'level_4', 'level_5', 'level_6', 'level_7', 'level_8', 'level_9', 'level_10');
CREATE TYPE sector_type AS ENUM ('it', 'healthcare', 'manufacturing', 'agriculture', 'retail', 'hospitality', 'construction', 'education', 'finance', 'other');
CREATE TYPE course_type AS ENUM ('certification', 'diploma', 'apprenticeship', 'skill_training', 'degree');

-- Profiles table for learner data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  age INTEGER,
  education_level education_level,
  location TEXT,
  prior_skills TEXT[],
  certifications TEXT[],
  career_aspirations TEXT,
  socio_economic_background socio_economic_status,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- NSQF Programs/Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  nsqf_level nsqf_level NOT NULL,
  sector sector_type NOT NULL,
  course_type course_type NOT NULL,
  duration_months INTEGER,
  prerequisites TEXT[],
  job_roles TEXT[],
  market_demand_score INTEGER DEFAULT 50 CHECK (market_demand_score >= 0 AND market_demand_score <= 100),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Learner progress tracking
CREATE TABLE public.learner_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Recommendations table
CREATE TABLE public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  recommendation_score INTEGER DEFAULT 50 CHECK (recommendation_score >= 0 AND recommendation_score <= 100),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Career roadmap table
CREATE TABLE public.career_roadmap (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  step_number INTEGER NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_estimate TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, step_number)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_roadmap ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for courses (public read access)
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- RLS Policies for learner_progress
CREATE POLICY "Users can view their own progress" ON public.learner_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.learner_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.learner_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for recommendations
CREATE POLICY "Users can view their own recommendations" ON public.recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own recommendations" ON public.recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for career_roadmap
CREATE POLICY "Users can view their own roadmap" ON public.career_roadmap FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roadmap" ON public.career_roadmap FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own roadmap" ON public.career_roadmap FOR UPDATE USING (auth.uid() = user_id);

-- Trigger to update profiles updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample courses
INSERT INTO public.courses (title, description, nsqf_level, sector, course_type, duration_months, prerequisites, job_roles, market_demand_score) VALUES
('Cloud Computing Fundamentals', 'Learn AWS, Azure, and GCP basics for cloud infrastructure management', 'level_5', 'it', 'certification', 6, ARRAY['Basic computer knowledge', '12th pass'], ARRAY['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'], 85),
('Cybersecurity Essentials', 'Master network security, ethical hacking, and data protection', 'level_6', 'it', 'certification', 8, ARRAY['IT diploma', 'Networking basics'], ARRAY['Security Analyst', 'Penetration Tester', 'Security Consultant'], 90),
('Data Analytics with Python', 'Data analysis, visualization, and machine learning fundamentals', 'level_5', 'it', 'diploma', 12, ARRAY['Graduate', 'Basic programming'], ARRAY['Data Analyst', 'Business Intelligence Analyst', 'Data Scientist'], 88),
('Full Stack Web Development', 'Complete web development training from frontend to backend', 'level_6', 'it', 'diploma', 10, ARRAY['12th pass', 'Basic HTML/CSS'], ARRAY['Full Stack Developer', 'Web Developer', 'Software Engineer'], 92),
('Nursing Assistant Training', 'Healthcare fundamentals and patient care skills', 'level_4', 'healthcare', 'certification', 9, ARRAY['10th pass'], ARRAY['Nursing Assistant', 'Patient Care Technician', 'Home Health Aide'], 78),
('Medical Coding Specialist', 'ICD-10, CPT coding for healthcare billing and insurance', 'level_5', 'healthcare', 'certification', 6, ARRAY['12th pass', 'Healthcare background'], ARRAY['Medical Coder', 'Billing Specialist', 'Health Information Technician'], 75),
('CNC Machine Operator', 'Computer-controlled machining and manufacturing processes', 'level_4', 'manufacturing', 'apprenticeship', 12, ARRAY['10th pass', 'Basic mathematics'], ARRAY['CNC Operator', 'Machine Technician', 'Production Operator'], 70),
('Industrial Automation Technician', 'PLC programming, robotics, and automated systems', 'level_5', 'manufacturing', 'diploma', 18, ARRAY['ITI/Diploma', 'Electronics knowledge'], ARRAY['Automation Engineer', 'PLC Programmer', 'Robotics Technician'], 82),
('Digital Marketing Professional', 'SEO, social media, content marketing, and analytics', 'level_5', 'retail', 'certification', 5, ARRAY['Graduate', 'Basic computer skills'], ARRAY['Digital Marketer', 'SEO Specialist', 'Content Strategist'], 85),
('Hotel Management Diploma', 'Hospitality operations, customer service, and management', 'level_5', 'hospitality', 'diploma', 24, ARRAY['12th pass'], ARRAY['Hotel Manager', 'Front Office Executive', 'Guest Relations Manager'], 65);
