'use client'

import { CategoryPerformance } from '@/lib/types'
import { Progress } from '@/components/ui/progress'

interface CategoryChartProps {
  category: CategoryPerformance
}

export default function CategoryChart({ category }: CategoryChartProps) {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-500'
    if (accuracy >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4">
      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-semibold text-foreground">{category.category}</p>
          <span className="text-sm font-bold text-muted-foreground">
            {category.total_correct}/{category.total_answered}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full ${getAccuracyColor(category.accuracy_percentage)} transition-all`}
                style={{ width: `${category.accuracy_percentage}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-foreground">
            {category.accuracy_percentage}%
          </span>
        </div>
      </div>
    </div>
  )
}
