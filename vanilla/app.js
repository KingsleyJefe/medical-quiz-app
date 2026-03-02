import { QUESTIONS } from './questions.js';

class Quizpital {
  constructor() {
    this.questions = QUESTIONS;
    this.currentScreen = 'categories';
    this.selectedCategory = null;
    this.sessionQuestions = [];
    this.currentQuestionIndex = 0;
    this.stats = { correct: 0, total: 0 };
    this.questionAnswers = {};
    this.sessionStartTime = null;

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const app = document.getElementById('app');
    
    if (this.currentScreen === 'categories') {
      app.innerHTML = this.renderCategories();
    } else if (this.currentScreen === 'session') {
      app.innerHTML = this.renderSessionSetup();
    } else if (this.currentScreen === 'quiz') {
      app.innerHTML = this.renderQuiz();
    } else if (this.currentScreen === 'results') {
      app.innerHTML = this.renderResults();
    }

    this.attachEventListeners();
  }

  renderCategories() {
    const categories = [...new Set(this.questions.map(q => q.category))];
    const questionsToDisplay = this.selectedCategory 
      ? this.questions.filter(q => q.category === this.selectedCategory)
      : this.questions;

    return `
      <div class="categories-screen screen active">
        <div class="header">
          <div class="header-content container">
            <h1>Quizpital</h1>
            <button class="btn-small btn-outline" data-action="viewProgress">View Progress</button>
          </div>
        </div>
        
        <div class="categories-content">
          <div class="categories-inner">
            <div class="hero">
              <h1>Quizpital</h1>
              <p>Medical pattern recognition training</p>
              <p style="font-size: 0.95rem; color: var(--muted-foreground);">Learn diseases through triads, pathognomonic signs, and clinical clues</p>
            </div>

            <div class="card-lg">
              <div class="category-selector">
                <h2>Select Category</h2>
                <div class="category-grid">
                  <button class="category-btn ${!this.selectedCategory ? 'selected' : ''}" data-category="all">
                    All Categories
                  </button>
                  ${categories.map(cat => `
                    <button class="category-btn ${this.selectedCategory === cat ? 'selected' : ''}" data-category="${cat}">
                      ${cat}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="question-count">
                <p>Questions available: <span class="count">${questionsToDisplay.length}</span></p>
              </div>

              <button class="btn-secondary btn-large btn-block" data-action="goToSession" ${questionsToDisplay.length === 0 ? 'disabled' : ''}>
                Continue
              </button>
            </div>

            <div class="info-grid">
              <div class="info-card">
                <div class="number">${questionsToDisplay.length}</div>
                <div class="label">Questions</div>
              </div>
              <div class="info-card">
                <div class="number">Fast</div>
                <div class="label">~2 min per Q</div>
              </div>
              <div class="info-card">
                <div class="number">Smart</div>
                <div class="label">Pattern-based</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${this.renderHelpDialog()}
    `;
  }

  renderSessionSetup() {
    const questionsToDisplay = this.selectedCategory 
      ? this.questions.filter(q => q.category === this.selectedCategory)
      : this.questions;

    return `
      <div class="session-setup screen active">
        <div class="session-container">
          <div class="session-card animate-fade-in">
            <h2>How many questions?</h2>
            <p>Select your session size</p>

            <div class="question-options">
              ${[5, 10, 15, 20].map(count => `
                <button class="question-option" data-count="${count}" ${count > questionsToDisplay.length ? 'disabled' : ''}>
                  <div class="number">${count}</div>
                  <div class="label">Questions</div>
                </button>
              `).join('')}
            </div>

            <div class="session-buttons">
              <button class="btn-primary btn-large" data-action="startSession" disabled id="startBtn">
                Start Session
              </button>
              <button class="btn-outline btn-large" data-action="backToCategories">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      ${this.renderHelpDialog()}
    `;
  }

  renderQuiz() {
    const currentQ = this.sessionQuestions[this.currentQuestionIndex];
    if (!currentQ) {
      this.currentScreen = 'results';
      this.render();
      return '';
    }

    const progress = ((this.currentQuestionIndex + 1) / this.sessionQuestions.length) * 100;
    const answer = this.questionAnswers[currentQ.id];

    let promptHTML = '';
    if (currentQ.question_type === 'triad' && Array.isArray(currentQ.prompt)) {
      promptHTML = currentQ.prompt.join(' → ');
    } else if (currentQ.question_type === 'best_answer') {
      promptHTML = currentQ.prompt;
    } else {
      promptHTML = currentQ.prompt;
    }

    return `
      <div class="quiz-screen screen active">
        <div class="quiz-header">
          <div class="quiz-header-content container">
            <div style="flex: 1;">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
              </div>
              <div class="progress-text">
                <span>${this.currentQuestionIndex + 1} / ${this.sessionQuestions.length}</span>
                ${this.stats.correct > 0 ? `
                  <div class="streak">
                    <span>🔥 ${this.stats.correct} correct</span>
                  </div>
                ` : ''}
                <small>Accuracy: ${this.stats.total > 0 ? Math.round((this.stats.correct / this.stats.total) * 100) : '-'}%</small>
              </div>
            </div>
            <button class="btn-small btn-outline" data-action="toggleHelp">?</button>
          </div>
        </div>

        <div class="quiz-content">
          <div class="quiz-inner">
            <div class="question-card">
              <span class="question-type">${currentQ.question_type === 'triad' ? 'Triad' : currentQ.question_type === 'pathognomonic' ? 'Pathognomonic' : 'Multiple Choice'}</span>
              <div class="question-prompt">${promptHTML}</div>

              ${currentQ.question_type === 'best_answer' ? `
                <div class="question-options-list">
                  ${currentQ.options.map((opt, i) => `
                    <button class="option-btn" data-option="${i}" ${answer !== undefined ? 'disabled' : ''}>
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              ` : `
                <div class="answer-input-area">
                  <input type="text" id="answerInput" placeholder="Type your answer..." autocomplete="off" ${answer !== undefined ? 'disabled' : ''}>
                  <p class="input-hint">💡 Press <kbd>Enter</kbd> or click Submit</p>
                </div>
              `}

              ${answer === undefined ? `
                <div class="quiz-buttons">
                  <button class="btn-primary" data-action="submitAnswer" ${currentQ.question_type === 'best_answer' ? 'disabled' : ''}>
                    Submit
                  </button>
                  <button class="btn-outline" data-action="skip">
                    Skip
                  </button>
                </div>
              ` : `
                <div id="feedback" class="feedback-card ${answer.is_correct ? 'correct' : 'incorrect'}">
                  <div class="answer-display">
                    <h3>${answer.correct_answer}</h3>
                  </div>

                  <div class="feedback-section">
                    <h4>Definition</h4>
                    <p>${answer.definition}</p>
                  </div>

                  <div class="feedback-section">
                    <h4>Hallmark Features</h4>
                    <ul class="features-list">
                      ${answer.hallmark_features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                  </div>

                  <div class="exam-pearl">
                    <h5 style="margin: 0 0 0.5rem 0; color: var(--secondary); font-size: 0.875rem; font-weight: 700;">💡 Exam Pearl</h5>
                    <p>${answer.exam_pearl}</p>
                  </div>

                  <div class="pitfall">
                    <h5 style="margin: 0 0 0.5rem 0; color: var(--destructive); font-size: 0.875rem; font-weight: 700;">⚠️ Common Pitfall</h5>
                    <p>${answer.pitfall}</p>
                  </div>
                </div>

                <div class="quiz-buttons" style="margin-top: 2rem;">
                  <button class="btn-secondary btn-large btn-block" data-action="nextQuestion">
                    ${this.currentQuestionIndex + 1 === this.sessionQuestions.length ? 'View Results' : 'Next Question'}
                  </button>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
      ${this.renderHelpDialog()}
    `;
  }

  renderResults() {
    const accuracy = this.stats.total > 0 ? Math.round((this.stats.correct / this.stats.total) * 100) : 0;
    const categoryStats = this.calculateCategoryStats();

    return `
      <div class="results-screen screen active">
        <div class="results-container">
          <div class="results-card animate-fade-in">
            <div class="accuracy-circle">
              <div style="text-align: center;">
                <p class="accuracy-percent">${accuracy}%</p>
              </div>
            </div>

            <h2>Quiz Complete!</h2>
            <p>You got <span class="score-highlight">${this.stats.correct}</span> out of <span class="score-highlight">${this.stats.total}</span> correct</p>

            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">${this.stats.correct}</div>
                <div class="stat-label">Correct</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.stats.total - this.stats.correct}</div>
                <div class="stat-label">Incorrect</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.stats.total}</div>
                <div class="stat-label">Total</div>
              </div>
            </div>

            ${accuracy >= 80 ? '<p style="color: var(--success); margin: 1rem 0; font-weight: 600;">🎉 Excellent performance!</p>' : ''}
            ${accuracy >= 60 && accuracy < 80 ? '<p style="color: var(--secondary); margin: 1rem 0; font-weight: 600;">👍 Good job! Review weak areas.</p>' : ''}
            ${accuracy < 60 ? '<p style="color: var(--accent); margin: 1rem 0; font-weight: 600;">📚 Keep studying! Review the feedback carefully.</p>' : ''}

            <div class="results-buttons">
              <button class="btn-secondary btn-large btn-block" data-action="startNewSession">
                Start New Session
              </button>
              <button class="btn-outline btn-large btn-block" data-action="goHome">
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderHelpDialog() {
    return `
      <div class="help-overlay" id="helpOverlay">
        <div class="help-dialog">
          <button class="help-close" data-action="closeHelp">×</button>
          <h3>How to Use Quizpital</h3>

          <div class="help-section">
            <h4>Question Types</h4>
            <p><strong>Triad:</strong> Three related findings that point to a diagnosis</p>
            <p><strong>Pathognomonic:</strong> A single finding that uniquely identifies a disease</p>
            <p><strong>Multiple Choice:</strong> Select the best answer from options</p>
          </div>

          <div class="help-section">
            <h4>Keyboard Shortcuts</h4>
            <ul class="shortcuts-list">
              <li>
                <span>Submit Answer</span>
                <kbd>Enter</kbd>
              </li>
              <li>
                <span>Next Question</span>
                <kbd>Space</kbd>
              </li>
              <li>
                <span>Help Menu</span>
                <kbd>H</kbd>
              </li>
            </ul>
          </div>

          <div class="help-section">
            <h4>Tips</h4>
            <p>• Read the definition carefully to understand the disease</p>
            <p>• Exam pearls highlight key facts for boards</p>
            <p>• Common pitfalls help avoid mistakes</p>
            <p>• Track your progress with real-time accuracy</p>
          </div>
        </div>
      </div>
    `;
  }

  calculateCategoryStats() {
    const stats = {};
    this.sessionQuestions.forEach(q => {
      if (!stats[q.category]) {
        stats[q.category] = { correct: 0, total: 0 };
      }
      stats[q.category].total++;
      if (this.questionAnswers[q.id]?.is_correct) {
        stats[q.category].correct++;
      }
    });
    return stats;
  }

  attachEventListeners() {
    // Category selection
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedCategory = e.target.dataset.category === 'all' ? null : e.target.dataset.category;
        this.render();
      });
    });

    // Navigation
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'goToSession') {
          this.currentScreen = 'session';
          this.render();
        } else if (action === 'backToCategories') {
          this.currentScreen = 'categories';
          this.selectedCategory = null;
          this.render();
        } else if (action === 'viewProgress') {
          // TODO: Implement progress view
        } else if (action === 'startSession') {
          const selected = document.querySelector('.question-option[data-selected]');
          if (selected) {
            const count = parseInt(selected.dataset.count);
            this.startSession(count);
          }
        } else if (action === 'submitAnswer') {
          this.submitAnswer();
        } else if (action === 'skip') {
          this.skipQuestion();
        } else if (action === 'nextQuestion') {
          this.nextQuestion();
        } else if (action === 'startNewSession') {
          this.currentScreen = 'categories';
          this.selectedCategory = null;
          this.sessionQuestions = [];
          this.currentQuestionIndex = 0;
          this.stats = { correct: 0, total: 0 };
          this.questionAnswers = {};
          this.render();
        } else if (action === 'goHome') {
          this.currentScreen = 'categories';
          this.selectedCategory = null;
          this.sessionQuestions = [];
          this.currentQuestionIndex = 0;
          this.stats = { correct: 0, total: 0 };
          this.questionAnswers = {};
          this.render();
        } else if (action === 'toggleHelp') {
          document.getElementById('helpOverlay').classList.toggle('active');
        } else if (action === 'closeHelp') {
          document.getElementById('helpOverlay').classList.remove('active');
        }
      });
    });

    // Question option selection
    document.querySelectorAll('.question-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const current = document.querySelector('.question-option[data-selected]');
        if (current) current.removeAttribute('data-selected');
        e.currentTarget.setAttribute('data-selected', 'true');
        document.getElementById('startBtn').removeAttribute('disabled');
      });
    });

    // Answer input
    const answerInput = document.getElementById('answerInput');
    if (answerInput) {
      answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.submitAnswer();
        }
      });
      answerInput.focus();
    }

    // Option selection for multiple choice
    document.querySelectorAll('[data-option]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const option = e.currentTarget.dataset.option;
        this.selectOption(parseInt(option));
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'h' || e.key === 'H') {
        document.getElementById('helpOverlay').classList.toggle('active');
      } else if (e.key === ' ' && this.currentScreen === 'quiz') {
        const nextBtn = document.querySelector('[data-action="nextQuestion"]');
        if (nextBtn && !nextBtn.disabled) {
          e.preventDefault();
          this.nextQuestion();
        }
      }
    });
  }

  startSession(questionCount) {
    const available = this.selectedCategory 
      ? this.questions.filter(q => q.category === this.selectedCategory)
      : this.questions;

    this.sessionQuestions = this.shuffleArray([...available]).slice(0, questionCount);
    this.currentQuestionIndex = 0;
    this.stats = { correct: 0, total: 0 };
    this.questionAnswers = {};
    this.currentScreen = 'quiz';
    this.render();
  }

  submitAnswer() {
    const currentQ = this.sessionQuestions[this.currentQuestionIndex];
    let userAnswer = '';
    let isCorrect = false;

    if (currentQ.question_type === 'best_answer') {
      // Handle multiple choice
      const selected = document.querySelector('[data-option][data-selected]');
      if (selected) {
        userAnswer = currentQ.options[parseInt(selected.dataset.option)];
      }
    } else {
      // Handle text input
      userAnswer = document.getElementById('answerInput').value.toLowerCase().trim();
    }

    isCorrect = currentQ.accepted_answers.some(ans => 
      ans.toLowerCase().includes(userAnswer) || userAnswer.includes(ans.toLowerCase())
    );

    this.stats.total++;
    if (isCorrect) this.stats.correct++;

    this.questionAnswers[currentQ.id] = {
      is_correct: isCorrect,
      user_answer: userAnswer,
      correct_answer: currentQ.accepted_answers[0],
      definition: currentQ.definition,
      hallmark_features: currentQ.hallmark_features,
      exam_pearl: currentQ.exam_pearl,
      pitfall: currentQ.pitfall
    };

    this.render();
  }

  skipQuestion() {
    const currentQ = this.sessionQuestions[this.currentQuestionIndex];
    this.stats.total++;
    this.questionAnswers[currentQ.id] = {
      is_correct: false,
      user_answer: 'skipped',
      correct_answer: currentQ.accepted_answers[0],
      definition: currentQ.definition,
      hallmark_features: currentQ.hallmark_features,
      exam_pearl: currentQ.exam_pearl,
      pitfall: currentQ.pitfall
    };
    this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.sessionQuestions.length) {
      this.currentScreen = 'results';
    }
    this.render();
  }

  selectOption(index) {
    const currentQ = this.sessionQuestions[this.currentQuestionIndex];
    const userAnswer = currentQ.options[index];
    const isCorrect = currentQ.accepted_answers.some(ans => 
      ans.toLowerCase() === userAnswer.toLowerCase()
    );

    this.stats.total++;
    if (isCorrect) this.stats.correct++;

    this.questionAnswers[currentQ.id] = {
      is_correct: isCorrect,
      user_answer: userAnswer,
      correct_answer: currentQ.accepted_answers[0],
      definition: currentQ.definition,
      hallmark_features: currentQ.hallmark_features,
      exam_pearl: currentQ.exam_pearl,
      pitfall: currentQ.pitfall
    };

    this.render();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Quizpital();
});
