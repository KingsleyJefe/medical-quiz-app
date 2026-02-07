'use client'

import { Card } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string | number
  subtext: string
  color: 'primary' | 'secondary' | 'accent' | 'green'
}

export default function StatCard({
  label,
  value,
  subtext,
  color,
}: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    green: 'bg-green-500 text-white',
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-background to-muted/30 p-4 sm:p-6">
      <div className="space-y-3">
        <div
          className={`inline-block h-10 w-10 rounded-lg ${colorClasses[color]} flex items-center justify-center text-lg font-bold`}
        >
          {value.toString().charAt(0)}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </div>
    </Card>
  )
}
