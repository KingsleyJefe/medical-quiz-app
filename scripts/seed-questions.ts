import { createClient } from '@supabase/supabase-js'
import { SAMPLE_QUESTIONS } from '../lib/sample-questions'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

async function seedQuestions() {
  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('Starting to seed questions...')

  // Transform sample questions to database format
  const questionsToInsert = SAMPLE_QUESTIONS.map((q) => ({
    question_id: q.id,
    question_type: q.question_type,
    prompt:
      typeof q.prompt === 'string' ? { text: q.prompt } : { items: q.prompt },
    category: q.category,
    difficulty_level: q.difficulty_level,
    accepted_answers: q.accepted_answers,
    options: q.options || null,
    definition: q.definition,
    hallmark_features: q.hallmark_features,
    exam_pearl: q.exam_pearl,
    pitfall: q.pitfall,
  }))

  try {
    // Delete existing questions
    await supabase.from('questions').delete().neq('id', '')

    // Insert new questions
    const { data, error } = await supabase
      .from('questions')
      .insert(questionsToInsert)

    if (error) {
      console.error('Error seeding questions:', error)
      process.exit(1)
    }

    console.log(`Successfully seeded ${questionsToInsert.length} questions`)
    process.exit(0)
  } catch (error) {
    console.error('Failed to seed questions:', error)
    process.exit(1)
  }
}

seedQuestions()
