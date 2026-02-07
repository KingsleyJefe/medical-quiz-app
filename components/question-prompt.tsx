'use client'

import { Question } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface QuestionPromptProps {
  question: Question
}

export default function QuestionPrompt({ question }: QuestionPromptProps) {
  const getDifficultyColor = (level: number) => {
    if (level <= 2) return 'bg-green-100 text-green-800'
    if (level === 3) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getQuestionTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      triad: 'Triad Recognition',
      pathognomonic: 'Pathognomonic Clue',
      best_answer: 'Best Answer',
      progressive_reveal: 'Progressive Reveal',
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-xs uppercase tracking-wide">
          {question.category}
        </Badge>
        <Badge
          className={`text-xs uppercase tracking-wide ${getDifficultyColor(
            question.difficulty_level
          )}`}
        >
          Level {question.difficulty_level}
        </Badge>
      </div>

      <div className="space-y-3">
        {Array.isArray(question.prompt) ? (
          // Triad or list format
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {getQuestionTypeLabel(question.question_type)}
            </p>
            <div className="space-y-2">
              {(question.prompt as string[]).map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Single text prompt
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {getQuestionTypeLabel(question.question_type)}
            </p>
            <p className="text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              {question.prompt}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
