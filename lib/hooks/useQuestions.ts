import { useEffect, useState } from 'react'
import { Question } from '@/lib/types'
import { SAMPLE_QUESTIONS } from '@/lib/sample-questions'

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        const response = await fetch('/api/questions')
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions from database')
        }

        const dbQuestions = await response.json()

        // If database has questions, use them. Otherwise, fall back to sample questions
        if (dbQuestions.length > 0) {
          setQuestions(dbQuestions)
        } else {
          console.log('No questions in database, using sample questions')
          setQuestions(SAMPLE_QUESTIONS)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching questions:', err)
        // Fall back to sample questions if fetch fails
        setQuestions(SAMPLE_QUESTIONS)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  return { questions, loading, error }
}
