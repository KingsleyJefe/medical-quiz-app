'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Flame, Home, RotateCw } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get stats from URL params
  const correct = parseInt(searchParams.get('correct') || '0')
  const total = parseInt(searchParams.get('total') || '0')
  const category = searchParams.get('category') || 'General'

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

  // Performance feedback
  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy === 100) return 'Perfect score! Outstanding mastery!'
    if (accuracy >= 80) return 'Excellent work! Strong understanding.'
    if (accuracy >= 60) return 'Good effort! Keep practicing.'
    return 'Keep practicing to improve.'
  }

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-accent'
    if (accuracy >= 60) return 'text-secondary'
    return 'text-primary'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Results Container */}
        <div className="space-y-8">
          {/* Score Circle */}
          <div className="flex justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent/10"></div>
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent">{accuracy}%</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    Accuracy
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Results Card */}
          <Card className="border-2 border-muted bg-gradient-to-br from-card to-muted/30 p-8">
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground">
                  Quiz Complete!
                </h1>
                <p className="mt-2 text-muted-foreground">{category}</p>
              </div>

              {/* Score Details */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-background p-4 text-center">
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <p className="mt-2 text-3xl font-bold text-accent">
                    {correct}
                  </p>
                </div>
                <div className="rounded-lg bg-background p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {total}
                  </p>
                </div>
                <div className="rounded-lg bg-background p-4 text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {correct}/{total}
                  </p>
                </div>
              </div>

              {/* Performance Message */}
              <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-4">
                <p className={`text-center font-medium ${getPerformanceColor(accuracy)}`}>
                  {getPerformanceMessage(accuracy)}
                </p>
              </div>

              {/* Tips Section */}
              {accuracy < 100 && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Tips for Improvement
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Review the explanations for missed questions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Focus on hallmark features and exam pearls</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Retake the quiz to reinforce learning</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
            >
              <RotateCw className="mr-2 h-5 w-5" />
              Take Another Quiz
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
