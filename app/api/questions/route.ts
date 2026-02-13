import { NextRequest, NextResponse } from 'next/server'
import { SAMPLE_QUESTIONS } from '@/lib/sample-questions'

export async function GET(request: NextRequest) {
  try {
    // For now, return sample questions from the cache
    // When you set up the database, this will fetch from Supabase
    return NextResponse.json(SAMPLE_QUESTIONS)
  } catch (error) {
    console.error('Error in GET /api/questions:', error)
    return NextResponse.json(SAMPLE_QUESTIONS)
  }
}

  } catch (error) {
    console.error('Error in GET /api/questions:', error)
    return NextResponse.json(SAMPLE_QUESTIONS)
  }
}


