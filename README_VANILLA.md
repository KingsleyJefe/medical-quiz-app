# MedQuiz - Vanilla HTML/CSS/JavaScript Version

This is a vanilla JavaScript version of MedQuiz - a medical pattern recognition quiz application. No frameworks, no build tools, just pure HTML, CSS, and JavaScript.

## Files

- **index.html** - Main HTML structure
- **styles.css** - Complete styling (824 lines)
- **questions.js** - 25 sample medical questions
- **app.js** - Application logic and state management (461 lines)

## Features

✓ Category-based question filtering
✓ Session setup with custom question counts
✓ Three question types: triads, pathognomonic signs, best-answer
✓ Real-time progress tracking
✓ Immediate feedback with exam pearls and pitfalls
✓ Results screen with accuracy stats
✓ Responsive mobile-first design
✓ Keyboard shortcuts (Enter to submit, Space for next, H for home)
✓ Help modal with shortcuts

## Running the App

### Option 1: Using Python (built-in)
```bash
python3 -m http.server 8000 --directory .
# Visit http://localhost:8000
```

### Option 2: Using Node.js http-server
```bash
npm install
npm start
# or
npx http-server . -p 8000 -c-1
```

### Option 3: Using Node.js built-in
```bash
node -e "require('http').createServer((req, res) => { const fs = require('fs'); const file = req.url === '/' ? 'index.html' : req.url; fs.readFile(file, (err, data) => { res.writeHead(200); res.end(data); }); }).listen(8000)"
```

## Architecture

The app uses a single `MedQuiz` class with methods for:

- **Screen Management**: `switchScreen()` - manages 4 screens (categories, session, quiz, results)
- **Data Handling**: `getFilteredQuestions()`, `shuffleArray()` - question management
- **Quiz Logic**: `handleSubmitAnswer()`, `checkAnswer()` - answer validation
- **Rendering**: `render*()` methods - dynamic DOM updates

### State Management

```javascript
{
  currentScreen: 'categories|session|quiz|results',
  selectedCategory: null or string,
  sessionQuestions: [],
  currentQuestionIndex: 0,
  stats: { correct: 0, total: 0 },
  answerValue: string,
  selectedOption: null or index
}
```

## Adding Questions

Edit `questions.js` and add to the `SAMPLE_QUESTIONS` array:

```javascript
{
  id: 'q26',
  question_type: 'triad', // or 'pathognomonic' or 'best_answer'
  prompt: ['Item 1', 'Item 2', 'Item 3'],
  category: 'Pulmonology',
  difficulty_level: 2,
  accepted_answers: ['answer1', 'answer2'],
  options: [], // only for best_answer
  definition: 'Medical definition...',
  hallmark_features: ['feature1', 'feature2'],
  exam_pearl: 'Key clinical insight...',
  pitfall: 'Common mistake...'
}
```

## Design System

### Colors
- Primary: `#0084ff` (blue)
- Secondary: `#ffa500` (orange)
- Accent: `#ff4757` (red)
- Background: `#fafbfc` (light gray)

### Typography
- System font stack for maximum compatibility
- Responsive sizing with rem units
- Consistent line-height (1.4-1.6)

### Layout
- Mobile-first responsive design
- Flexbox for most layouts
- Grid for category selection and stats
- Max-width containers for readability

## Browser Support

Works in all modern browsers:
- Chrome/Edge 88+
- Firefox 78+
- Safari 12+

## Performance

- **0 dependencies** - pure vanilla JS
- **~1.5MB uncompressed** (mostly minifiable)
- **No build process** - ready to use immediately
- **Fast initial load** - all code in 3 files

## Customization

### Styling
Edit `styles.css` to change colors, spacing, fonts, or animations.

### Questions
Add/edit questions in `questions.js` - categories, difficulty, and content are fully customizable.

### Behavior
Modify methods in the `MedQuiz` class in `app.js` to change quiz logic, validation rules, or feedback mechanisms.

## License

ISC
