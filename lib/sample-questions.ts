import { Question } from './types'

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question_type: 'triad',
    prompt: ['Asthma', 'Eosinophilia', 'Sinusitis'],
    category: 'Pulmonology',
    difficulty_level: 2,
    accepted_answers: [
      'eosinophilic granulomatosis with polyangiitis',
      'egpa',
      'churg-strauss syndrome',
    ],
    definition:
      'A necrotizing vasculitis affecting small vessels in patients with asthma and prominent eosinophilia.',
    hallmark_features: [
      'Three-phase presentation: asthma → eosinophilia → necrotizing vasculitis',
      'Peripheral neuropathy (especially mononeuritis multiplex)',
      'Cardiac involvement with granulomas',
      'p-ANCA positive (MPO antibodies)',
    ],
    exam_pearl:
      'Think of EGPA when you see the triad of asthma, eosinophilia, and systemic manifestations.',
    pitfall:
      'Often confused with allergic bronchopulmonary aspergillosis (ABPA), but EGPA has vasculitis.',
  },
  {
    id: 'q2',
    question_type: 'pathognomonic',
    prompt: 'Koplik spots',
    category: 'Pediatrics',
    difficulty_level: 1,
    accepted_answers: ['measles', 'rubeola', 'measles virus'],
    definition:
      'Pathognomonic oral lesions consisting of small white spots with red halos on the buccal mucosa.',
    hallmark_features: [
      'Appear 2-3 days before the characteristic rash',
      'Look like "grains of salt on a red background"',
      'Found on buccal mucosa opposite molars',
      'Disappear as the maculopapular rash emerges',
    ],
    exam_pearl:
      'Koplik spots are virtually diagnostic of measles and appear BEFORE the rash.',
    pitfall:
      'Students often forget to look for Koplik spots and miss the diagnosis in the prodromal phase.',
  },
  {
    id: 'q3',
    question_type: 'best_answer',
    prompt: 'A 45-year-old man presents with progressive dyspnea and a CXR showing upper lobe cavitary lesions. He has night sweats and weight loss. What is the most likely diagnosis?',
    category: 'Pulmonology',
    difficulty_level: 3,
    accepted_answers: ['tuberculosis', 'tb', 'pulmonary tuberculosis'],
    options: [
      'Pneumonia caused by Streptococcus pneumoniae',
      'Tuberculosis',
      'Lung cancer',
      'Sarcoidosis',
    ],
    definition:
      'A chronic infectious disease caused by Mycobacterium tuberculosis, classically presenting with cavitary lesions in the upper lobes.',
    hallmark_features: [
      'Upper lobe cavitary lesions on CXR (apical-posterior segments)',
      'Constitutional symptoms: fever, night sweats, weight loss',
      'Productive cough, often with hemoptysis',
      'Risk factors include immunosuppression, overcrowding, poor nutrition',
    ],
    exam_pearl:
      'Upper lobe cavitary disease with night sweats is classic tuberculosis until proven otherwise.',
    pitfall:
      'Secondary TB (reactivation) can present atypically in immunocompromised patients.',
  },
  {
    id: 'q4',
    question_type: 'triad',
    prompt: ['Abdominal pain', 'Jaundice', 'Fever'],
    category: 'Gastroenterology',
    difficulty_level: 2,
    accepted_answers: [
      'ascending cholangitis',
      'acute cholangitis',
      'cholangitis',
    ],
    definition:
      'Infection of the bile ducts with stasis and obstruction. This is a medical emergency.',
    hallmark_features: [
      'Charcot triad: fever, RUQ pain, jaundice',
      'Often has biliary obstruction (stones, strictures, malignancy)',
      'E. coli, Klebsiella, and anaerobes are common pathogens',
      'Reynolds pentad adds: altered mental status and hypotension (septic shock)',
    ],
    exam_pearl:
      'Charcot triad (fever, RUQ pain, jaundice) is pathognomonic for ascending cholangitis.',
    pitfall:
      'Not all patients present with the full triad; high suspicion needed with any two features.',
  },
  {
    id: 'q5',
    question_type: 'pathognomonic',
    prompt: 'Splinter hemorrhages under fingernails',
    category: 'Cardiology',
    difficulty_level: 2,
    accepted_answers: ['endocarditis', 'bacterial endocarditis', 'ie'],
    definition:
      'Linear hemorrhages beneath the nails that appear as thin red or black lines running with the long axis of the nail.',
    hallmark_features: [
      'Part of Duke criteria for infective endocarditis',
      'Can occur with bacterial endocarditis or trauma',
      'Usually suggest right-sided endocarditis in IV drug users',
      'More common in subacute disease',
    ],
    exam_pearl:
      'Splinter hemorrhages are a classic stigma of endocarditis, but trauma is more common.',
    pitfall:
      'Overinterpretation: splinter hemorrhages from trauma are much more common than from endocarditis.',
  },
]
