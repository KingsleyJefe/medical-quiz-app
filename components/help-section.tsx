'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

export default function HelpSection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How to Use Quizpital</DialogTitle>
          <DialogDescription>
            Tips and keyboard shortcuts to maximize your learning
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Types */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Question Types</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-primary">
                  Triad Recognition
                </span>
                <p className="text-muted-foreground">
                  Three clinical features that point to one diagnosis
                </p>
              </div>
              <div>
                <span className="font-medium text-secondary">
                  Pathognomonic Clue
                </span>
                <p className="text-muted-foreground">
                  A single defining sign or symptom
                </p>
              </div>
              <div>
                <span className="font-medium text-accent">Best Answer</span>
                <p className="text-muted-foreground">
                  Multiple choice with one clearly best option
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Tips for Success</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Focus on patterns, not memorization</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Read the exam pearls carefully</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Learn from pitfalls to avoid mistakes</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Review weak categories in progress</span>
              </li>
            </ul>
          </div>

          {/* Shortcuts */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Submit answer</span>
                <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs font-semibold">
                  Enter
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Quick answer (text)
                </span>
                <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs font-semibold">
                  Type + Enter
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
