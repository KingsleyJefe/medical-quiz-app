'use client'

import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <Progress
        value={progress}
        className="h-2 bg-muted"
      />
      <p className="text-right text-xs text-muted-foreground">
        {Math.round(progress)}% complete
      </p>
    </div>
  )
}
