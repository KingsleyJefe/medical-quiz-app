'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Question, QuizFeedback } from '@/lib/types'
import QuestionPrompt from './question-prompt'
import AnswerInput from './answer-input'
import FeedbackCard from './feedback-card'
import ProgressBar from './progress-bar'
import HelpSection from './help-section'
import { Button } from '@/components/ui/button'
import { Flame } from 'lucide-react'

interface QuizContainerProps {
  questions: Question[]
  onQuestionComplete: (questionId: string, isCorrect: boolean) => void
  category?: string
}

export default function QuizContainer({
  questions,
  onQuestionComplete,
  category = 'General',
}: QuizContainerProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const [hasNavigated, setHasNavigated] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  // Navigate to results when quiz is complete
  useEffect(() => {
    if (!currentQuestion && !hasNavigated && questions.length > 0) {
      setHasNavigated(true)
      const resultsUrl = `/results?correct=${stats.correct}&total=${stats.total}&category=${encodeURIComponent(category)}`
      router.push(resultsUrl)
    }
  }, [currentQuestion, hasNavigated, stats.correct, stats.total, category, router, questions.length])

  const handleAnswer = (userAnswer: string) => {
    if (!currentQuestion) return

    const isCorrect = currentQuestion.accepted_answers
      .map((a) => a.toLowerCase().trim())
      .includes(userAnswer.toLowerCase().trim())

    setFeedback({
      is_correct: isCorrect,
      user_answer: userAnswer,
      correct_answer: currentQuestion.accepted_answers[0],
      definition: currentQuestion.definition,
      hallmark_features: currentQuestion.hallmark_features,
      exam_pearl: currentQuestion.exam_pearl,
      pitfall: currentQuestion.pitfall,
    })

    setAnswered(true)
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))

    onQuestionComplete(currentQuestion.id, isCorrect)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFeedback(null)
      setAnswered(false)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center">
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Header with stats */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} / {questions.length}
            </span>
            {stats.correct > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                <Flame className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-accent">
                  {stats.correct} correct
                </span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-lg font-bold text-accent">
              {stats.total > 0
                ? `${Math.round((stats.correct / stats.total) * 100)}%`
                : '-'}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} />

        {/* Question section */}
        <div className="mt-8 space-y-8 rounded-2xl bg-card p-6 sm:p-8">
          <QuestionPrompt question={currentQuestion} />

          {!answered ? (
            <AnswerInput
              question={currentQuestion}
              onSubmit={handleAnswer}
            />
          ) : (
            <div className="space-y-6">
              <FeedbackCard feedback={feedback} />
              <Button
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {currentIndex < questions.length - 1
                  ? 'Next Question'
                  : 'View Results'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <HelpSection />
    </div>
  )
}
