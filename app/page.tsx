'use client'

import { useState } from 'react'
import QuizContainer from '@/components/quiz-container'
import SessionSetup from '@/components/session-setup'
import QuickStart from '@/components/quick-start'
import { useQuestions } from '@/lib/hooks/useQuestions'
import { shuffleArray } from '@/lib/shuffle'
import { Question } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [screen, setScreen] = useState<'categories' | 'session' | 'quiz'>('categories')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([])
  const { questions, loading, error } = useQuestions()

  // Get unique categories from database or sample questions
  const categories = [
    ...new Set(questions.map((q) => q.category)),
  ]

  // Filter questions by selected category or use all
  const questionsToDisplay = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions

  const handleStartSession = (questionCount: number) => {
    // Shuffle and slice the questions for this session
    const shuffled = shuffleArray(questionsToDisplay)
    const sessionQs = shuffled.slice(0, questionCount)
    setSessionQuestions(sessionQs)
    setScreen('quiz')
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setScreen('categories')
    setSessionQuestions([])
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-muted-foreground">Loading questions...</p>
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'categories') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="border-b border-border">
          <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground">MedQuiz</h1>
              <Button
                asChild
                variant="outline"
                className="text-sm bg-transparent"
              >
                <a href="/progress">View Progress</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
          {/* Header */}
          <div className="mb-12 space-y-4 text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              MedQuiz
            </h1>
            <p className="text-lg text-muted-foreground">
              Medical pattern recognition training
            </p>
            <p className="text-sm text-muted-foreground">
              Learn diseases through triads, pathognomonic signs, and clinical
              clues
            </p>
          </div>

          {/* Category selection */}
          <div className="rounded-2xl bg-card p-6 sm:p-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Select Category
            </h2>
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-lg border-2 p-4 font-medium transition-all ${
                  selectedCategory === null
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg border-2 p-4 font-medium transition-all ${
                    selectedCategory === category
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Question count */}
            <div className="mb-6 rounded-lg bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Questions available:{' '}
                <span className="font-bold text-foreground">
                  {questionsToDisplay.length}
                </span>
              </p>
            </div>

            {/* Start button */}
            <Button
              onClick={() => {
                setScreen('session')
              }}
              disabled={questionsToDisplay.length === 0}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
            >
              Continue
            </Button>
          </div>

          {/* Quick start */}
          <QuickStart />

          {/* Info section */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-card p-4">
              <div className="text-2xl font-bold text-primary">
                {questionsToDisplay.length}
              </div>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="text-2xl font-bold text-secondary">Fast</div>
              <p className="text-sm text-muted-foreground">~2 min per Q</p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="text-2xl font-bold text-accent">Smart</div>
              <p className="text-sm text-muted-foreground">Pattern-based</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (screen === 'session') {
    return (
      <main>
        <SessionSetup
          availableQuestions={questionsToDisplay.length}
          selectedCategory={selectedCategory || 'All Categories'}
          onStartSession={handleStartSession}
          onBackToCategories={handleBackToCategories}
        />
      </main>
    )
  }

  if (screen === 'quiz') {
    return (
      <main>
        <QuizContainer
          questions={sessionQuestions}
          onQuestionComplete={() => {}}
          category={selectedCategory || 'All Categories'}
        />
      </main>
    )
  }
}
