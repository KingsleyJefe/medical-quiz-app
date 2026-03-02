# Quizpital - Vanilla HTML/CSS/JS Edition

A clean, production-ready medical quiz application built with vanilla HTML, CSS, and JavaScript (no frameworks, no build tools).

## Quick Start

### Installation

```bash
cd vanilla
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### File Structure

```
vanilla/
├── index.html        # Main HTML entry point
├── styles.css        # Complete styling (responsive, animations, theme)
├── app.js            # Main application logic & state management
├── questions.js      # All 25 medical questions data
├── package.json      # Dependencies (only http-server for dev)
└── README.md         # This file
```

## Features

### Question Types
- **Triads**: Three related clinical findings that point to a diagnosis
- **Pathognomonic**: Single findings uniquely identifying diseases  
- **Multiple Choice**: Best-answer format with clinical scenarios

### Learning Tools
- Real-time progress tracking with accuracy percentage
- Immediate feedback with:
  - Correct disease name and definition
  - Hallmark features (bulleted list)
  - Exam pearls (key facts for boards)
  - Common pitfalls (mistakes to avoid)
- Category-based filtering
- Session customization (5, 10, 15, 20 questions)
- Keyboard shortcuts for faster navigation

### UI/UX
- Mobile-first responsive design
- Smooth animations and transitions
- Accessibility features (semantic HTML, ARIA roles)
- Clean, modern color system (blue primary, orange secondary, red accent)
- Help dialog with shortcuts and tips

## Architecture

### State Management
The `MedQuiz` class manages all application state:
- Current screen (categories, session, quiz, results)
- Selected category and session questions
- Progress tracking (current index, stats)
- User answers and feedback

### Rendering
Each screen renders independently with full HTML generation:
- No virtual DOM, pure HTML strings
- Clean separation of concerns
- Easy to debug and modify

### Event Handling
Event listeners attached after each render:
- Button clicks for navigation
- Category selection
- Answer submission (text and multiple choice)
- Keyboard shortcuts (Enter, Space, H)

## Customization

### Adding Questions
Edit `questions.js` and add to the `QUESTIONS` array:

```javascript
{
  id: 'qXX',
  question_type: 'triad', // or 'pathognomonic' or 'best_answer'
  prompt: ['Finding 1', 'Finding 2', 'Finding 3'], // string for single, array for triads
  category: 'Pulmonology', // or any category
  difficulty_level: 2,
  accepted_answers: ['answer1', 'answer2'],
  definition: 'Disease definition...',
  hallmark_features: ['Feature 1', 'Feature 2'],
  exam_pearl: 'Key fact...',
  pitfall: 'Common mistake...',
  options: ['A', 'B', 'C', 'D'] // only for best_answer
}
```

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --primary: #0066ff;
  --secondary: #ff9900;
  --accent: #ff1744;
  /* ... */
}
```

### Modifying Layout
CSS is well-organized with:
- Base styles and typography
- Component styles (.card, .btn, etc.)
- Screen-specific styles
- Responsive breakpoints

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Zero build time**: Runs directly in browser
- **Minimal dependencies**: Only `http-server` for local development
- **Lightweight**: ~50KB total (HTML, CSS, JS)
- **Fast loading**: No framework overhead

## Deployment

### Static Hosting
Deploy to any static hosting service:
- Vercel (drop files in `/public`)
- Netlify (connect Git repo)
- GitHub Pages (push to gh-pages branch)
- AWS S3
- Any CDN

### Simple Web Server
```bash
# Python
python -m http.server 8000

# Node.js (with npx)
npx http-server
```

## Development

### Adding Features
1. Identify which component needs the feature
2. Update `render()` method to include new HTML
3. Add event listeners in `attachEventListeners()`
4. Update state in the appropriate method

### Debugging
Add console logs to trace execution:
```javascript
console.log('[v0]', 'variable:', variable);
```

### Testing
Manual testing workflow:
1. Start dev server: `npm run dev`
2. Use browser DevTools for debugging
3. Test on mobile with responsive mode
4. Check keyboard shortcuts

## License

MIT

## Support

For issues or questions:
1. Check the app's Help dialog (press `H`)
2. Review the code comments
3. Check the README sections above
