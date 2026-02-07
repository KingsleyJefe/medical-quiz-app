'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function QuickStart() {
  const features = [
    {
      title: 'Pattern Recognition',
      description: 'Learn to identify diseases through clinical patterns, not memorization',
    },
    {
      title: 'Immediate Feedback',
      description: 'Get instant explanations with exam pearls and common pitfalls',
    },
    {
      title: 'Track Progress',
      description: 'Monitor your accuracy by category and identify weak areas',
    },
    {
      title: 'Exam Ready',
      description: 'High-yield content focused on classic presentations and triads',
    },
  ]

  return (
    <div className="mt-12 space-y-6 rounded-2xl bg-card p-6 sm:p-8">
      <h2 className="text-lg font-bold text-foreground">Why MedQuiz?</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-3">
            <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{feature.title}</p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
