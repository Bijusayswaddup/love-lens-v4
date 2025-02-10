// Questions page logic will go here
import { LoadingManager } from '../modules/loading.js';
import { Storage } from '../modules/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loadingManager = new LoadingManager();
    const storage = new Storage();
    
    // Get user name
    const userName = prompt("💌 Before we begin... What's your beautiful name?");
    storage.save('currentUser', { name: userName, answers: [] });

    await loadingManager.simulateProgress(2000, 100, "💞 Preparing deep questions...");
    loadingManager.hideLoading();

    // Load questions from JSON
    const questions = await fetch('data/questions.json').then(res => res.json());
    const container = document.querySelector('.question-container');
    
    let currentQuestion = 0;
    
    function showQuestion() {
        const question = questions[currentQuestion];
        const questionHTML = document.createElement('div');
        questionHTML.className = `question ${currentQuestion === 0 ? 'active' : ''}`;
        questionHTML.innerHTML = `
            <h2>${question.text}</h2>
            ${question.options.map((opt, i) => `
                <button class="option" data-index="${i}">${opt}</button>
            `).join('')}
        `;
    
        container.appendChild(questionHTML);
        
        // Animation logic
        const prevQuestion = document.querySelector('.question.active');
        if (prevQuestion && currentQuestion > 0) {
            prevQuestion.classList.remove('active');
            prevQuestion.classList.add('exiting');
            
            prevQuestion.addEventListener('animationend', () => {
                prevQuestion.remove();
                questionHTML.classList.add('active');
            }, { once: true });
        }
    
        document.querySelectorAll('.option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Save answer logic
                const userData = storage.get('currentUser');
                userData.answers.push({
                    question: question.text,
                    answer: e.target.textContent
                });
                storage.save('currentUser', userData);
    
                // Animate out current question
                questionHTML.classList.add('exiting');
                
                questionHTML.addEventListener('animationend', () => {
                    if(currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        showQuestion();
                    } else {
                        showResults();
                    }
                }, { once: true });
            });
        });
    }
    
    function showResults() {
        alert("🔮 Calculating your unique love profile...");
        setTimeout(() => window.location.href = 'results.html', 5000);
    }
    
    showQuestion();
});