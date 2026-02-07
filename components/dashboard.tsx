'use client'

import { UserStats, CategoryPerformance } from '@/lib/types'
import StatCard from './stat-card'
import CategoryChart from './category-chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  stats?: UserStats
  categoryData?: CategoryPerformance[]
}

export default function Dashboard({ stats, categoryData }: DashboardProps) {
  // Mock data for demonstration
  const mockStats: UserStats = stats || {
    user_id: 'user123',
    total_answered: 24,
    total_correct: 18,
    current_streak: 5,
    longest_streak: 12,
    accuracy_percentage: 75,
  }

  const mockCategoryData: CategoryPerformance[] = categoryData || [
    { category: 'Cardiology', total_answered: 6, total_correct: 5, accuracy_percentage: 83 },
    { category: 'Pulmonology', total_answered: 5, total_correct: 3, accuracy_percentage: 60 },
    { category: 'Pediatrics', total_answered: 5, total_correct: 4, accuracy_percentage: 80 },
    { category: 'Gastroenterology', total_answered: 4, total_correct: 3, accuracy_percentage: 75 },
  ]

  const chartData = mockCategoryData.map((cat) => ({
    name: cat.category,
    accuracy: cat.accuracy_percentage,
    answered: cat.total_answered,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Progress</h1>
          <p className="mt-2 text-muted-foreground">
            Track your learning journey and identify weak areas
          </p>
        </div>

        {/* Main stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Questions Answered"
            value={mockStats.total_answered}
            subtext="total"
            color="primary"
          />
          <StatCard
            label="Correct Answers"
            value={mockStats.total_correct}
            subtext={`of ${mockStats.total_answered}`}
            color="green"
          />
          <StatCard
            label="Accuracy"
            value={`${Math.round((mockStats.total_correct / mockStats.total_answered) * 100)}%`}
            subtext="overall"
            color="secondary"
          />
          <StatCard
            label="Current Streak"
            value={mockStats.current_streak}
            subtext={`longest: ${mockStats.longest_streak}`}
            color="accent"
          />
        </div>

        {/* Category performance */}
        <div className="rounded-2xl bg-card p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-bold text-foreground">
            Category Performance
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                  }}
                  cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
                />
                <Legend />
                <Bar
                  dataKey="accuracy"
                  fill="var(--primary)"
                  radius={[8, 8, 0, 0]}
                  name="Accuracy %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category list */}
          <div className="mt-8 space-y-3">
            {mockCategoryData.map((cat) => (
              <CategoryChart key={cat.category} category={cat} />
            ))}
          </div>
        </div>

        {/* Tips section */}
        <div className="mt-8 space-y-4 rounded-2xl bg-accent/10 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground">Focus Areas</h2>
          <div className="space-y-2">
            {mockCategoryData
              .filter((cat) => cat.accuracy_percentage < 75)
              .sort((a, b) => a.accuracy_percentage - b.accuracy_percentage)
              .map((cat) => (
                <div key={cat.category} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{cat.category}</span> -{' '}
                    {cat.accuracy_percentage}% accuracy. Practice more in this
                    area.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
