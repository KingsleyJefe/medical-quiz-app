-- Create questions table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL UNIQUE,
  question_type TEXT NOT NULL CHECK (question_type IN ('triad', 'pathognomonic', 'best_answer')),
  prompt JSONB NOT NULL,
  category TEXT NOT NULL,
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level >= 1 AND difficulty_level <= 3),
  accepted_answers TEXT[] NOT NULL,
  options TEXT[] DEFAULT NULL,
  definition TEXT NOT NULL,
  hallmark_features TEXT[] NOT NULL,
  exam_pearl TEXT NOT NULL,
  pitfall TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty_level);

-- Enable RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read questions
CREATE POLICY "Allow public read access to questions"
  ON public.questions FOR SELECT
  USING (true);

-- Create policy to allow only authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to insert questions"
  ON public.questions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update questions"
  ON public.questions FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete questions"
  ON public.questions FOR DELETE
  USING (auth.role() = 'authenticated');
