export type QuestionType = 'triad' | 'pathognomonic' | 'best_answer' | 'progressive_reveal'

export interface Question {
  id: string
  question_type: QuestionType
  prompt: string | string[] // string for single, array for triads
  category: string
  difficulty_level: number
  accepted_answers: string[]
  definition: string
  hallmark_features: string[]
  exam_pearl: string
  pitfall: string
  options?: string[] // for multiple choice
  created_at?: string
}

export interface UserProgress {
  id: string
  user_id: string
  question_id: string
  is_correct: boolean
  answered_at: string
  category: string
}

export interface UserStats {
  user_id: string
  total_answered: number
  total_correct: number
  current_streak: number
  longest_streak: number
  last_answered_at?: string
  accuracy_percentage?: number
}

export interface CategoryPerformance {
  category: string
  total_answered: number
  total_correct: number
  accuracy_percentage: number
}

export interface QuizFeedback {
  is_correct: boolean
  user_answer: string
  definition: string
  hallmark_features: string[]
  exam_pearl: string
  pitfall: string
}
