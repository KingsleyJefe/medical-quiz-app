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
  {
    id: "q6",
    "question_type": "triad",
    "prompt": ["Projectile non-bilious vomiting", "Palpable olive-shaped mass", "Hypochloremic metabolic alkalosis"],
    "category": "Pediatrics",
    "difficulty_level": 2,
    "accepted_answers": ["hypertrophic pyloric stenosis", "pyloric stenosis"],
    "definition": "Hypertrophy of the pyloric muscle causing gastric outlet obstruction in infants.",
    "hallmark_features": ["Projectile vomiting", "Palpable epigastric mass", "Metabolic alkalosis"],
    "exam_pearl": "Occurs classically in first-born male infants.",
    "pitfall": "Can be confused with GERD, which does not cause metabolic alkalosis."
  },
  {
    "id": "q7",
    "question_type": "pathognomonic",
    "prompt": "Strawberry tongue and fingertip peeling in a febrile child",
    "category": "Pediatrics",
    "difficulty_level": 1,
    "accepted_answers": ["kawasaki disease"],
    "definition": "An acute vasculitis of childhood affecting medium-sized arteries.",
    "hallmark_features": ["Prolonged fever", "Mucocutaneous inflammation", "Cervical lymphadenopathy"],
    "exam_pearl": "Untreated cases risk coronary artery aneurysms.",
    "pitfall": "Mistaking it for viral exanthems without cardiac involvement."
  },
  {
    "id": "q8",
    "question_type": "best_answer",
    "prompt": "A newborn develops bilious vomiting and abdominal distension shortly after birth. What is the most likely diagnosis?",
    "category": "Pediatrics",
    "difficulty_level": 2,
    "accepted_answers": ["duodenal atresia"],
    "definition": "A congenital obstruction of the duodenum often associated with Down syndrome.",
    "hallmark_features": ["Bilious vomiting", "Double bubble sign", "Early neonatal presentation"],
    "exam_pearl": "Think Down syndrome with bilious vomiting.",
    "pitfall": "Confusing with pyloric stenosis, which is non-bilious."
  },
  {
    "id": "q9",
    "question_type": "triad",
    "prompt": ["Delayed passage of meconium", "Chronic constipation", "Abdominal distension"],
    "category": "Pediatrics",
    "difficulty_level": 2,
    "accepted_answers": ["hirschsprung disease"],
    "definition": "Congenital absence of enteric ganglion cells causing functional bowel obstruction.",
    "hallmark_features": ["Delayed meconium", "Chronic constipation", "Megacolon"],
    "exam_pearl": "Failure to pass meconium within 48 hours is a red flag.",
    "pitfall": "Mistaking for functional constipation."
  },
  {
    "id": "q10",
    "question_type": "pathognomonic",
    "prompt": "Blueberry muffin rash in a neonate",
    "category": "Pediatrics",
    "difficulty_level": 2,
    "accepted_answers": ["congenital rubella"],
    "definition": "A congenital viral infection caused by maternal rubella exposure.",
    "hallmark_features": ["Blueberry muffin rash", "Cataracts", "Sensorineural deafness"],
    "exam_pearl": "Classic TORCH infection finding.",
    "pitfall": "Confusing with neonatal bruising."
  },
  {
    "id": "q11",
    "question_type": "triad",
    "prompt": ["Chronic productive cough", "Recurrent respiratory infections", "Bronchiectasis on imaging"],
    "category": "Pulmonology",
    "difficulty_level": 2,
    "accepted_answers": ["cystic fibrosis"],
    "definition": "Autosomal recessive disorder affecting chloride transport, leading to thick secretions.",
    "hallmark_features": ["Chronic lung infections", "Pancreatic insufficiency", "Bronchiectasis"],
    "exam_pearl": "Think CF in young patients with bronchiectasis.",
    "pitfall": "Attributing symptoms solely to asthma."
  },
  {
    "id": "q12",
    "question_type": "pathognomonic",
    "prompt": "Hyperresonance to percussion with absent breath sounds after trauma",
    "category": "Pulmonology",
    "difficulty_level": 3,
    "accepted_answers": ["tension pneumothorax"],
    "definition": "Accumulation of air under pressure in the pleural space causing cardiovascular compromise.",
    "hallmark_features": ["Tracheal deviation", "Hypotension", "Absent breath sounds"],
    "exam_pearl": "Do not wait for imaging before needle decompression.",
    "pitfall": "Delaying treatment for chest X-ray."
  },
  {
    "id": "q13",
    "question_type": "best_answer",
    "prompt": "Which condition is most associated with asbestos exposure?",
    "category": "Pulmonology",
    "difficulty_level": 2,
    "accepted_answers": ["mesothelioma"],
    "definition": "A malignant tumor of the pleura linked to asbestos exposure.",
    "hallmark_features": ["Pleural thickening", "Chest pain", "Dyspnea"],
    "exam_pearl": "Long latency period after exposure.",
    "pitfall": "Confusing with lung adenocarcinoma."
  },
  {
    "id": "q14",
    "question_type": "triad",
    "prompt": ["Young adult", "Noncaseating granulomas", "Bilateral hilar lymphadenopathy"],
    "category": "Pulmonology",
    "difficulty_level": 2,
    "accepted_answers": ["sarcoidosis"],
    "definition": "Multisystem granulomatous disease of unknown cause.",
    "hallmark_features": ["Hilar lymphadenopathy", "Pulmonary infiltrates", "Skin or eye involvement"],
    "exam_pearl": "ACE levels may be elevated.",
    "pitfall": "Confusing with tuberculosis."
  },
  {
    "id": "q15",
    "question_type": "pathognomonic",
    "prompt": "Honeycombing pattern on lung CT",
    "category": "Pulmonology",
    "difficulty_level": 3,
    "accepted_answers": ["idiopathic pulmonary fibrosis"],
    "definition": "Chronic progressive interstitial lung disease causing fibrosis.",
    "hallmark_features": ["Dry cough", "Progressive dyspnea", "Honeycombing on imaging"],
    "exam_pearl": "Restrictive lung disease pattern.",
    "pitfall": "Mistaking for COPD."
  },
  {
    "id": "q16",
    "question_type": "triad",
    "prompt": ["Chest pain", "Dyspnea", "Syncope on exertion"],
    "category": "Cardiology",
    "difficulty_level": 2,
    "accepted_answers": ["aortic stenosis"],
    "definition": "Narrowing of the aortic valve causing obstruction to left ventricular outflow.",
    "hallmark_features": ["Crescendo-decrescendo systolic murmur", "Radiates to carotids", "Classic triad: angina, syncope, dyspnea"],
    "exam_pearl": "Remember SAD mnemonic: Syncope, Angina, Dyspnea.",
    "pitfall": "Do not miss asymptomatic severe cases; murmur may be subtle."
  },
  {
    "id": "q17",
    "question_type": "pathognomonic",
    "prompt": "Janeway lesions and Osler nodes in a febrile patient",
    "category": "Cardiology",
    "difficulty_level": 2,
    "accepted_answers": ["infective endocarditis", "bacterial endocarditis", "ie"],
    "definition": "Infection of the endocardial surface of the heart, usually valves.",
    "hallmark_features": ["Fever", "Heart murmur", "Embolic phenomena (Janeway, Osler)"],
    "exam_pearl": "Janeway lesions are painless, Osler nodes are painful.",
    "pitfall": "Misdiagnosis as vasculitis or sepsis without cardiac evaluation."
  },
  {
    "id": "q18",
    "question_type": 'best_answer',
    "prompt": "A patient has sudden crushing chest pain radiating to the left arm and jaw. ECG shows ST elevation in leads II, III, aVF. Which artery is most likely occluded?",
    "category": "Cardiology",
    "difficulty_level": 3,
    "accepted_answers": ["right coronary artery", "rca"],
    "definition": "Acute myocardial infarction due to coronary artery occlusion.",
    "hallmark_features": ["ST elevation in inferior leads", "Chest pain", "Possible bradycardia or heart block"],
    "exam_pearl": "Inferior MI often involves RCA.",
    "pitfall": "Do not miss STEMI; rapid reperfusion is critical."
  },
  {
    "id": "q19",
    "question_type": "triad",
    "prompt": ["Fever", "Jaundice", "Right upper quadrant pain"],
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["ascending cholangitis", "cholangitis"],
    "definition": "Bacterial infection of the bile ducts, often due to obstruction.",
    "hallmark_features": ["Charcot triad", "RUQ tenderness", "Elevated bilirubin and liver enzymes"],
    "exam_pearl": "Classic triad: fever, jaundice, RUQ pain.",
    "pitfall": "Reynolds pentad includes hypotension and altered mental status; don’t miss sepsis."
  },
  {
    "id": "q20",
    "question_type": "pathognomonic",
    "prompt": "Punched-out ulcers in the distal duodenum with epigastric pain relieved by food",
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["peptic ulcer disease", "duodenal ulcer"],
    "definition": "Ulceration of the gastric or duodenal mucosa caused by acid-peptic damage.",
    "hallmark_features": ["Epigastric pain", "Nocturnal pain", "Relief with meals (duodenal)"],
    "exam_pearl": "Consider H. pylori infection and NSAID use.",
    "pitfall": "Do not confuse with gastric ulcers, which worsen with food."
  },
  {
    "id": "q21",
    "question_type": 'best_answer',
    "prompt": "A patient presents with severe epigastric pain radiating to the back, nausea, and elevated amylase/lipase. Most likely diagnosis?",
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["acute pancreatitis"],
    "definition": "Inflammation of the pancreas with systemic manifestations.",
    "hallmark_features": ["Epigastric pain radiating to back", "Nausea/vomiting", "Elevated pancreatic enzymes"],
    "exam_pearl": "Common causes: gallstones and alcohol.",
    "pitfall": "Do not miss perforated peptic ulcer or myocardial infarction."
  },
  {
    "id": "q22",
    "question_type": "triad",
    "prompt": ["Diarrhea", "Abdominal pain", "Weight loss"],
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["crohn disease", "crohn's disease"],
    "definition": "Chronic inflammatory bowel disease affecting any part of the GI tract.",
    "hallmark_features": ["Transmural inflammation", "Skip lesions", "Fistulas and strictures"],
    "exam_pearl": "Can present with extraintestinal manifestations (arthritis, uveitis).",
    "pitfall": "Do not confuse with ulcerative colitis (continuous colonic involvement)."
  },
  {
    "id": "q23",
    "question_type": "pathognomonic",
    "prompt": "Esophageal web in the upper esophagus with dysphagia",
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["plummer-vinson syndrome", "paterson-kelly syndrome"],
    "definition": "Syndrome associated with iron deficiency anemia, dysphagia, and esophageal webs.",
    "hallmark_features": ["Iron deficiency anemia", "Esophageal webs", "Glossitis or cheilitis"],
    "exam_pearl": "Risk factor for squamous cell carcinoma of the esophagus.",
    "pitfall": "Do not overlook iron deficiency as a treatable cause."
  },
  {
    "id": "q24",
    "question_type": 'best_answer',
    "prompt": "A patient presents with chronic heartburn, regurgitation, and nocturnal cough. What is the most likely diagnosis?",
    "category": "Gastroenterology",
    "difficulty_level": 1,
    "accepted_answers": ["gastroesophageal reflux disease", "gerd"],
    "definition": "Backflow of gastric contents into the esophagus causing symptoms.",
    "hallmark_features": ["Heartburn", "Regurgitation", "Nocturnal cough or hoarseness"],
    "exam_pearl": "Lifestyle modification is first-line treatment.",
    "pitfall": "Do not confuse with cardiac chest pain."
  },
  {
    "id": "q25",
    "question_type": "triad",
    "prompt": ["Steatorrhea", "Weight loss", "Vitamin deficiencies"],
    "category": "Gastroenterology",
    "difficulty_level": 2,
    "accepted_answers": ["celiac disease"],
    "definition": "Autoimmune disorder triggered by gluten causing small intestinal villous atrophy.",
    "hallmark_features": ["Malabsorption", "Chronic diarrhea", "Dermatitis herpetiformis"],
    "exam_pearl": "Screen high-risk groups (type 1 diabetes, autoimmune thyroid disease).",
    "pitfall": "Do not ignore atypical presentations (anemia, osteoporosis)."
  },
  // ADD NEW QUESTIONS BELOW THIS LINE
  // IMPORTANT: Remember to add a COMMA after the last question above!
  // TEMPLATE - Copy, modify, and add inside the array:
  // {
  //   "id": "qXX",
  //   "question_type": "triad" | "pathognomonic" | "best_answer",
  //   "prompt": "question text" or ["triad", "item", "here"],
  //   "category": "Pulmonology" | "Pediatrics" | "Cardiology" | "Gastroenterology",
  //   "difficulty_level": 1 | 2 | 3,
  //   "accepted_answers": ["answer1", "answer2"],
  //   "options": ["A", "B", "C", "D"] // only for best_answer
  //   "definition": "definition",
  //   "hallmark_features": ["feature1", "feature2"],
  //   "exam_pearl": "pearl",
  //   "pitfall": "pitfall"
  // }
]

