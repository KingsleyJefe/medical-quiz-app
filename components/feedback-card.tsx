'use client'

import { QuizFeedback } from '@/lib/types'
import { CheckCircle, XCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface FeedbackCardProps {
  feedback: QuizFeedback | null
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  if (!feedback) return null

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Result indicator */}
      <div className="flex items-center gap-3">
        {feedback.is_correct ? (
          <>
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-bold text-green-600">Correct!</span>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-red-500" />
            <span className="text-lg font-bold text-red-600">
              Not quite right
            </span>
          </>
        )}
      </div>

      {/* Main learning card */}
      <Card className="border-2 border-muted bg-gradient-to-br from-background to-muted/30 p-4 sm:p-6">
        <div className="space-y-4">
          {/* Definition */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Definition
            </p>
            <p className="mt-2 leading-relaxed text-foreground">
              {feedback.definition}
            </p>
          </div>

          {/* Hallmark features */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Hallmark Features
            </p>
            <ul className="mt-2 space-y-1">
              {feedback.hallmark_features.map((feature, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground">
                  <span className="font-bold text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam pearl */}
          <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Exam Pearl
            </p>
            <p className="mt-1 text-sm text-foreground">{feedback.exam_pearl}</p>
          </div>

          {/* Pitfall */}
          <div className="rounded-lg border-l-4 border-destructive bg-destructive/5 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-destructive">
              Common Pitfall
            </p>
            <p className="mt-1 text-sm text-foreground">{feedback.pitfall}</p>
          </div>
        </div>
      </Card>

      {/* User's answer (if incorrect) */}
      {!feedback.is_correct && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">
            Your Answer
          </p>
          <p className="mt-2 text-sm text-red-900">{feedback.user_answer}</p>
        </div>
      )}
    </div>
  )
}
