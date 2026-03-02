// Quizpital Application - Vanilla JavaScript
class Quizpital {
  constructor() {
    this.currentScreen = 'categories';
    this.selectedCategory = null;
    this.sessionQuestions = [];
    this.currentQuestionIndex = 0;
    this.stats = { correct: 0, total: 0 };
    this.allQuestions = SAMPLE_QUESTIONS;
    this.answerValue = '';
    this.selectedOption = null;
    
    this.initializeDOM();
    this.attachEventListeners();
    this.renderCategoriesScreen();
  }

  initializeDOM() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <nav class="navbar">
        <div class="navbar-content">
          <h1>Quizpital</h1>
          <button class="btn btn-outline" onclick="app.goHome()">Home</button>
        </div>
      </nav>
      
      <div class="categories-screen screen active" id="categoriesScreen"></div>
      <div class="session-setup screen" id="sessionScreen"></div>
      <div class="quiz-screen screen" id="quizScreen"></div>
      <div class="results-screen screen" id="resultsScreen"></div>
      
      <button class="help-button" onclick="app.toggleHelp()">?</button>
      <div class="modal" id="helpModal">
        <div class="modal-content">
          <div class="modal-header">
            <span>Keyboard Shortcuts</span>
            <button class="modal-close" onclick="app.toggleHelp()">×</button>
          </div>
          <ul class="shortcuts-list">
            <li class="shortcuts-item">
              <span>Submit Answer</span>
              <kbd class="shortcut-key">Enter</kbd>
            </li>
            <li class="shortcuts-item">
              <span>Next Question</span>
              <kbd class="shortcut-key">Space</kbd>
            </li>
            <li class="shortcuts-item">
              <span>Home</span>
              <kbd class="shortcut-key">H</kbd>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (this.currentScreen === 'quiz') {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSubmitAnswer();
        } else if (e.code === 'Space') {
          e.preventDefault();
          this.handleNextQuestion();
        }
      }
      if (e.key === 'h' || e.key === 'H') {
        this.goHome();
      }
    });
  }

  switchScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screen + 'Screen').classList.add('active');
    this.currentScreen = screen;
  }

  renderCategoriesScreen() {
    const categories = [...new Set(this.allQuestions.map(q => q.category))];
    const categoryContent = document.getElementById('categoriesScreen');
    
    categoryContent.innerHTML = `
      <div class="categories-content">
        <div class="header">
          <h2>MedQuiz</h2>
          <p>Medical pattern recognition training</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Learn diseases through triads, pathognomonic signs, and clinical clues</p>
        </div>
        
        <div class="category-card">
          <div class="category-label">Select Category</div>
          <div class="categories-grid">
            <button class="category-btn ${!this.selectedCategory ? 'active' : ''}" 
              onclick="app.selectCategory(null)">
              All Categories
            </button>
            ${categories.map(cat => `
              <button class="category-btn ${this.selectedCategory === cat ? 'active' : ''}" 
                onclick="app.selectCategory('${cat}')">
                ${cat}
              </button>
            `).join('')}
          </div>
          
          <div class="question-count">
            <p>Questions available: <strong>${this.getFilteredQuestions().length}</strong></p>
          </div>
          
          <button class="btn btn-secondary" style="width: 100%;" onclick="app.startSession()">
            Continue
          </button>
        </div>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="info-item-value">${this.getFilteredQuestions().length}</div>
            <div class="info-item-label">Questions</div>
          </div>
          <div class="info-item">
            <div class="info-item-value">Fast</div>
            <div class="info-item-label">~2 min per Q</div>
          </div>
          <div class="info-item">
            <div class="info-item-value">Smart</div>
            <div class="info-item-label">Pattern-based</div>
          </div>
        </div>
      </div>
    `;
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.renderCategoriesScreen();
  }

  getFilteredQuestions() {
    return this.selectedCategory 
      ? this.allQuestions.filter(q => q.category === this.selectedCategory)
      : this.allQuestions;
  }

  startSession() {
    const filtered = this.getFilteredQuestions();
    if (filtered.length === 0) return;
    
    this.switchScreen('session');
    this.renderSessionScreen();
  }

  renderSessionScreen() {
    const filtered = this.getFilteredQuestions();
    const sessionScreen = document.getElementById('sessionScreen');
    
    sessionScreen.innerHTML = `
      <div class="session-setup-card">
        <h3>Select Question Count</h3>
        <p>Choose how many questions you'd like to answer in this session</p>
        
        <div class="radio-group">
          ${[5, 10, 15, 20].map(count => `
            <label class="radio-option">
              <input type="radio" name="questionCount" value="${count}" 
                ${count === 10 ? 'checked' : ''}>
              <label style="flex: 1; cursor: pointer;">${count} Questions ${count > filtered.length ? '(only ' + filtered.length + ' available)' : ''}</label>
            </label>
          `).join('')}
        </div>
        
        <div class="session-buttons">
          <button class="btn btn-secondary" onclick="app.startQuiz()">Start Quiz</button>
          <button class="btn btn-outline" onclick="app.goHome()">Cancel</button>
        </div>
      </div>
    `;
  }

  startQuiz() {
    const count = parseInt(document.querySelector('input[name="questionCount"]:checked').value);
    const filtered = this.getFilteredQuestions();
    const shuffled = this.shuffleArray([...filtered]);
    this.sessionQuestions = shuffled.slice(0, count);
    this.currentQuestionIndex = 0;
    this.stats = { correct: 0, total: 0 };
    
    this.switchScreen('quiz');
    this.renderQuizScreen();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  renderQuizScreen() {
    if (this.currentQuestionIndex >= this.sessionQuestions.length) {
      this.showResults();
      return;
    }

    const question = this.sessionQuestions[this.currentQuestionIndex];
    const quizScreen = document.getElementById('quizScreen');
    
    const progress = ((this.currentQuestionIndex + 1) / this.sessionQuestions.length) * 100;
    
    let promptHTML = '';
    if (question.question_type === 'triad' && Array.isArray(question.prompt)) {
      promptHTML = `
        <div class="triad-items">
          ${question.prompt.map(item => `<div class="triad-item">${item}</div>`).join('')}
        </div>
      `;
    } else {
      promptHTML = `<p class="question-text">${question.prompt}</p>`;
    }

    let answerSectionHTML = '';
    if (question.question_type === 'best_answer') {
      answerSectionHTML = `
        <div class="options-grid">
          ${question.options.map((opt, i) => `
            <button class="option-btn ${this.selectedOption === i ? 'selected' : ''}" 
              onclick="app.selectOption(${i})">
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    } else {
      answerSectionHTML = `
        <div class="answer-input-section">
          <label class="answer-input-label">Your Answer</label>
          <div class="input-group">
            <input type="text" id="answerInput" placeholder="Type your answer..." 
              value="${this.answerValue}" 
              onkeypress="if(event.key==='Enter') app.handleSubmitAnswer()"
              oninput="app.answerValue = this.value">
          </div>
          <div class="char-count">${this.answerValue.length} characters</div>
        </div>
      `;
    }

    quizScreen.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress">
          <span>${this.currentQuestionIndex + 1} / ${this.sessionQuestions.length}</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="quiz-stats">
          ${this.stats.correct > 0 ? `
            <div class="streak">
              🔥 ${this.stats.correct} correct
            </div>
          ` : ''}
          <div class="accuracy">
            <div class="accuracy-label">Accuracy</div>
            <div class="accuracy-value">${this.stats.total > 0 ? Math.round((this.stats.correct / this.stats.total) * 100) : '-'}%</div>
          </div>
        </div>
      </div>
      
      <div class="quiz-container">
        <div class="quiz-content">
          <div class="question-prompt">
            <div class="question-label">${question.question_type}</div>
            ${promptHTML}
          </div>
          
          ${answerSectionHTML}
          
          <button class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;" 
            onclick="app.handleSubmitAnswer()">
            ${question.question_type === 'best_answer' && this.selectedOption === null ? 'Select an option' : 'Submit'}
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('answerInput')?.focus();
  }

  selectOption(index) {
    this.selectedOption = this.selectedOption === index ? null : index;
    this.renderQuizScreen();
  }

  handleSubmitAnswer() {
    const question = this.sessionQuestions[this.currentQuestionIndex];
    let userAnswer = '';
    
    if (question.question_type === 'best_answer') {
      if (this.selectedOption === null) return;
      userAnswer = question.options[this.selectedOption];
    } else {
      userAnswer = this.answerValue.trim().toLowerCase();
      if (!userAnswer) return;
    }

    const isCorrect = this.checkAnswer(userAnswer, question.accepted_answers);
    this.stats.total++;
    if (isCorrect) this.stats.correct++;

    this.showFeedback(question, userAnswer, isCorrect);
  }

  checkAnswer(userAnswer, acceptedAnswers) {
    const normalized = userAnswer.toLowerCase().trim();
    return acceptedAnswers.some(ans => 
      normalized === ans.toLowerCase() || 
      normalized.includes(ans.toLowerCase()) ||
      ans.toLowerCase().includes(normalized)
    );
  }

  showFeedback(question, userAnswer, isCorrect) {
    const quizScreen = document.getElementById('quizScreen');
    const correctAnswer = question.accepted_answers[0];

    quizScreen.innerHTML = `
      <div class="quiz-header">
        <span>${this.currentQuestionIndex + 1} / ${this.sessionQuestions.length}</span>
      </div>
      
      <div class="quiz-container">
        <div class="quiz-content feedback-container">
          <div class="feedback-answer">
            <div class="feedback-answer-label">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</div>
            <div class="feedback-answer-value">${correctAnswer}</div>
          </div>
          
          <div class="feedback-section">
            <div class="feedback-title">Definition</div>
            <div class="feedback-text">${question.definition}</div>
          </div>
          
          <div class="feedback-section">
            <div class="feedback-title">Hallmark Features</div>
            <ul class="feedback-list">
              ${question.hallmark_features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
          
          <div class="feedback-pearl">
            <div class="feedback-pearl-title">Exam Pearl</div>
            <div class="feedback-text">${question.exam_pearl}</div>
          </div>
          
          <div class="feedback-pitfall">
            <div class="feedback-pitfall-title">Common Pitfall</div>
            <div class="feedback-text">${question.pitfall}</div>
          </div>
          
          <button class="btn btn-secondary" style="width: 100%; margin-top: 2rem;" 
            onclick="app.handleNextQuestion()">
            Next Question
          </button>
        </div>
      </div>
    `;
  }

  handleNextQuestion() {
    this.currentQuestionIndex++;
    this.answerValue = '';
    this.selectedOption = null;
    
    if (this.currentQuestionIndex >= this.sessionQuestions.length) {
      this.showResults();
    } else {
      this.renderQuizScreen();
    }
  }

  showResults() {
    this.switchScreen('results');
    const accuracy = Math.round((this.stats.correct / this.stats.total) * 100);
    const incorrect = this.stats.total - this.stats.correct;

    let message = '';
    if (accuracy >= 80) {
      message = '🎉 Outstanding! You have an excellent grasp of medical patterns. Keep up the momentum!';
    } else if (accuracy >= 60) {
      message = '✓ Good job! You\'re building solid pattern recognition skills. Review the difficult topics.';
    } else {
      message = 'Good effort! Focus on understanding the clinical clues and pathognomonic signs in the feedback.';
    }

    document.getElementById('resultsScreen').innerHTML = `
      <div class="results-card">
        <div class="results-score-circle">
          <div class="results-percentage">${accuracy}%</div>
        </div>
        
        <h2 class="results-title">Quiz Complete!</h2>
        
        <p class="results-subtitle">
          You got <strong>${this.stats.correct}</strong> out of <strong>${this.stats.total}</strong> correct
        </p>
        
        <div class="results-stats">
          <div class="results-stat">
            <div class="results-stat-value">${this.stats.correct}</div>
            <div class="results-stat-label">Correct</div>
          </div>
          <div class="results-stat">
            <div class="results-stat-value">${incorrect}</div>
            <div class="results-stat-label">Incorrect</div>
          </div>
          <div class="results-stat">
            <div class="results-stat-value">${this.stats.total}</div>
            <div class="results-stat-label">Total</div>
          </div>
        </div>
        
        <div class="results-message" style="background: rgba(0, 132, 255, 0.1); color: #0084ff;">
          ${message}
        </div>
        
        <div class="results-buttons">
          <button class="btn btn-secondary" onclick="app.startSession()">
            Start New Session
          </button>
          <button class="btn btn-outline" onclick="app.goHome()">
            Home
          </button>
        </div>
      </div>
    `;
  }

  toggleHelp() {
    const modal = document.getElementById('helpModal');
    modal.classList.toggle('active');
  }

  goHome() {
    this.selectedCategory = null;
    this.currentQuestionIndex = 0;
    this.answerValue = '';
    this.selectedOption = null;
    this.switchScreen('categories');
    this.renderCategoriesScreen();
  }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new Quizpital();
});
