'use client'

import { useState, useEffect } from 'react'
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
}

export default function QuizContainer({
  questions,
  onQuestionComplete,
}: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState({ correct: 0, total: 0 })

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (userAnswer: string) => {
    if (!currentQuestion) return

    const isCorrect = currentQuestion.accepted_answers
      .map((a) => a.toLowerCase().trim())
      .includes(userAnswer.toLowerCase().trim())

    setFeedback({
      is_correct: isCorrect,
      user_answer: userAnswer,
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
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-accent/20 p-6">
            <div className="text-6xl font-bold text-accent">{accuracy}%</div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You got <span className="font-bold text-accent">{stats.correct}</span> out of <span className="font-bold">{stats.total}</span> correct
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90"
            >
              Try Again
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
            >
              Back to Categories
            </Button>
          </div>
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
