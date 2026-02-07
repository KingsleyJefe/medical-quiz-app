'use client'

import { useState } from 'react'
import Dashboard from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProgressPage() {
  return (
    <main>
      <div className="mb-4 flex items-center gap-4 border-b border-border px-4 py-4 sm:px-6 sm:py-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <Dashboard />
    </main>
  )
}
