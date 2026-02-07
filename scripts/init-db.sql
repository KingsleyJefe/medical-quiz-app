-- Medical Quiz App Database Schema

-- Questions table - stores all quiz questions
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  question_type VARCHAR(50) NOT NULL, -- 'triad', 'pathognomonic', 'best_answer', 'progressive_reveal'
  prompt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'cardiology', 'pediatrics', 'pathology', etc.
  difficulty_level INTEGER DEFAULT 1, -- 1-5
  accepted_answers TEXT NOT NULL, -- JSON array of accepted answers (includes synonyms)
  definition TEXT NOT NULL,
  hallmark_features TEXT NOT NULL, -- JSON array of 2-4 features
  exam_pearl TEXT NOT NULL,
  pitfall TEXT NOT NULL,
  options TEXT, -- JSON array for multiple choice questions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress table - tracks performance
CREATE TABLE IF NOT EXISTS user_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(100),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- User stats table - aggregated stats for dashboard
CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY,
  total_answered INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_answered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Category performance table - tracks weak areas
CREATE TABLE IF NOT EXISTS category_performance (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  total_answered INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_category ON user_progress(category);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty_level);
