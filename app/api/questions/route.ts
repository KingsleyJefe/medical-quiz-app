import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching questions:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Transform database format to app format
    const formattedQuestions = data.map((q: any) => ({
      id: q.question_id,
      question_type: q.question_type,
      prompt: typeof q.prompt === 'string' ? JSON.parse(q.prompt) : q.prompt,
      category: q.category,
      difficulty_level: q.difficulty_level,
      accepted_answers: q.accepted_answers,
      options: q.options,
      definition: q.definition,
      hallmark_features: q.hallmark_features,
      exam_pearl: q.exam_pearl,
      pitfall: q.pitfall,
    }))

    return NextResponse.json(formattedQuestions)
  } catch (error) {
    console.error('Error in GET /api/questions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.id || !body.question_type || !body.prompt || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          question_id: body.id,
          question_type: body.question_type,
          prompt: typeof body.prompt === 'string' ? body.prompt : JSON.stringify(body.prompt),
          category: body.category,
          difficulty_level: body.difficulty_level || 1,
          accepted_answers: body.accepted_answers || [],
          options: body.options || null,
          definition: body.definition || '',
          hallmark_features: body.hallmark_features || [],
          exam_pearl: body.exam_pearl || '',
          pitfall: body.pitfall || '',
        },
      ])
      .select()

    if (error) {
      console.error('Error creating question:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/questions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
