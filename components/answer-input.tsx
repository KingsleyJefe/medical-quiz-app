'use client'

import React from "react"

import { useState } from 'react'
import { Question } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AnswerInputProps {
  question: Question
  onSubmit: (answer: string) => void
}

export default function AnswerInput({ question, onSubmit }: AnswerInputProps) {
  const [answer, setAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const isMCQ = question.question_type === 'best_answer' && question.options

  const handleSubmit = () => {
    const finalAnswer = isMCQ ? selectedOption : answer
    if (finalAnswer?.trim()) {
      onSubmit(finalAnswer)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isMCQ) {
      handleSubmit()
    }
  }

  return (
    <div className="space-y-4">
      {isMCQ ? (
        // Multiple choice options
        <div className="space-y-3">
          {question.options?.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelectedOption(option)}
              className={`w-full rounded-lg border-2 p-4 text-left font-medium transition-all ${
                selectedOption === option
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <span className="block text-sm uppercase tracking-wide text-muted-foreground">
                Option {String.fromCharCode(65 + i)}
              </span>
              <span className="mt-1 block">{option}</span>
            </button>
          ))}
        </div>
      ) : (
        // Text input for free recall
        <div className="space-y-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 border-2 border-border bg-background text-base placeholder:text-muted-foreground/70 focus:border-primary"
              autoFocus
            />
            {answer && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {answer.length} chars
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            💡 Press <kbd className="rounded bg-muted px-2 py-0.5 text-xs font-semibold">Enter</kbd> or click Submit
          </p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isMCQ ? !selectedOption : !answer.trim()}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
        size="lg"
      >
        Submit Answer
      </Button>
    </div>
  )
}
