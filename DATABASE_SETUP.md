# MedQuiz Database Setup Guide

This guide walks you through connecting MedQuiz to Supabase to save questions permanently.

## Setup Steps

### 1. Supabase Integration (Already Connected)
Your project is already connected to Supabase. Check the Vars section in the v0 UI sidebar to confirm you have:
- `NEXT_PUBLIC_SUPABASE_URL` 
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 2. Create the Database Table

Go to your Supabase dashboard and execute the SQL in the SQL Editor:

```sql
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

CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty_level);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to questions"
  ON public.questions FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert questions"
  ON public.questions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update questions"
  ON public.questions FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete questions"
  ON public.questions FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 3. Seed Initial Questions

After creating the table, run this command in your terminal to populate it with the sample questions:

```bash
npx ts-node scripts/seed-questions.ts
```

Or if you're using a different package manager:

```bash
pnpm exec ts-node scripts/seed-questions.ts
yarn ts-node scripts/seed-questions.ts
```

### 4. Add Questions via the App

Once the table is created, you can:

1. **Add questions programmatically** using the `/api/questions` endpoint
2. **Edit questions directly in Supabase** - Go to Supabase Dashboard > SQL Editor and update the `public.questions` table
3. **The app will automatically load** questions from the database on startup

## How It Works

- `lib/hooks/useQuestions.ts` - Fetches questions from the database via API
- `app/api/questions/route.ts` - GET endpoint returns all questions, POST creates new ones
- `lib/supabase/client.ts` - Client-side Supabase connection
- `lib/supabase/server.ts` - Server-side Supabase connection

**Fallback:** If the database is empty or unavailable, the app automatically uses the sample questions from `lib/sample-questions.ts`.

## Adding Questions After Setup

### Via API
```typescript
const response = await fetch('/api/questions', {
  method: 'POST',
  body: JSON.stringify({
    id: 'q26',
    question_type: 'triad',
    prompt: ['Sign 1', 'Sign 2', 'Sign 3'],
    category: 'Pulmonology',
    difficulty_level: 2,
    accepted_answers: ['Disease Name'],
    definition: 'Definition of disease...',
    hallmark_features: ['Feature 1', 'Feature 2'],
    exam_pearl: 'Key exam insight',
    pitfall: 'Common mistake'
  })
})
```

### Via Supabase Dashboard
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Execute an INSERT statement:
```sql
INSERT INTO public.questions (
  question_id, question_type, prompt, category, difficulty_level,
  accepted_answers, definition, hallmark_features, exam_pearl, pitfall
) VALUES (
  'q26', 'triad', '["Sign 1", "Sign 2", "Sign 3"]', 'Pulmonology', 2,
  ARRAY['Disease Name'], 'Definition...', ARRAY['Feature 1', 'Feature 2'],
  'Exam insight', 'Common mistake'
);
```

## Troubleshooting

**Questions still disappearing?**
- Check that the questions table was created successfully in Supabase
- Verify environment variables are set correctly in the Vars section
- Check browser console for fetch errors

**Getting empty questions list?**
- Ensure you've run the seed script to populate initial questions
- Check that the table has data in Supabase dashboard

**API errors?**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set as a server environment variable
- Check Supabase RLS policies are correctly configured
