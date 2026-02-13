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
        const response = await fetch('/api/questions', {
          cache: 'no-store'
        })
        
        if (response.ok) {
          const data = await response.json()
          setQuestions(Array.isArray(data) ? data : SAMPLE_QUESTIONS)
          setError(null)
        } else {
          // If API fails, use sample questions
          setQuestions(SAMPLE_QUESTIONS)
        }
      } catch (err) {
        console.error('Error fetching questions:', err)
        // Fall back to sample questions if fetch fails
        setQuestions(SAMPLE_QUESTIONS)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  return { questions, loading, error }
}
