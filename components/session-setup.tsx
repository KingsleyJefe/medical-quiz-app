'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface SessionSetupProps {
  availableQuestions: number
  selectedCategory: string
  onStartSession: (questionCount: number) => void
  onBackToCategories: () => void
}

const QUESTION_OPTIONS = [5, 10, 15, 20]

export default function SessionSetup({
  availableQuestions,
  selectedCategory,
  onStartSession,
  onBackToCategories,
}: SessionSetupProps) {
  const [selectedCount, setSelectedCount] = React.useState<number>(5)

  const maxAvailable = QUESTION_OPTIONS.reduce((acc, opt) => {
    return opt <= availableQuestions ? opt : acc
  }, QUESTION_OPTIONS[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Button
            onClick={onBackToCategories}
            variant="outline"
            className="mb-4 bg-transparent"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Session Setup
          </h1>
          <p className="text-lg text-muted-foreground">
            {selectedCategory}
          </p>
        </div>

        {/* Main card */}
        <Card className="space-y-6 border-2 p-6 sm:p-8">
          {/* Question count selector */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                How many questions?
              </h2>
              <p className="text-sm text-muted-foreground">
                {availableQuestions} questions available in this category
              </p>
            </div>

            <RadioGroup
              value={selectedCount.toString()}
              onValueChange={(value) => setSelectedCount(parseInt(value))}
            >
              <div className="space-y-3">
                {QUESTION_OPTIONS.map((count) => {
                  const isAvailable = count <= availableQuestions
                  return (
                    <div
                      key={count}
                      className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                        isAvailable
                          ? 'border-border hover:border-primary/50 hover:bg-primary/5'
                          : 'border-border bg-muted/50'
                      } ${
                        selectedCount === count && isAvailable
                          ? 'border-primary bg-primary/10'
                          : ''
                      }`}
                    >
                      <RadioGroupItem
                        value={count.toString()}
                        id={`q-${count}`}
                        disabled={!isAvailable}
                      />
                      <Label
                        htmlFor={`q-${count}`}
                        className={`flex-1 cursor-pointer font-medium ${
                          isAvailable
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{count} questions</span>
                          {count > availableQuestions && (
                            <span className="text-xs text-muted-foreground">
                              Not available
                            </span>
                          )}
                        </div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Info box */}
          <div className="rounded-lg bg-secondary/10 p-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Estimated time:</span> ~{selectedCount * 2} minutes
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Questions will appear in random order each session
            </p>
          </div>

          {/* Start button */}
          <Button
            onClick={() => onStartSession(selectedCount)}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            size="lg"
          >
            Start Session
          </Button>
        </Card>
      </div>
    </div>
  )
}
