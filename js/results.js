// Results page logic will go here
document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    const resultContent = document.querySelector('.result-content');
    const loader = document.querySelector('.result-loader');

    // Simulate analysis delay
    setTimeout(() => {
        loader.classList.add('hidden');
        resultContent.classList.remove('hidden');
        showResults(user);
        startConfetti();
    }, 3000);

    function showResults(user) {
        const answers = user.answers;
        resultContent.innerHTML = `
            <h1 class="result-title">💖 ${user.name}'s Love Profile 💖</h1>
            <div class="result-sections">
                ${answers.map((answer, index) => `
                    <section class="result-card">
                        <div class="card-header">
                            <span class="question-number">Q${index + 1}</span>
                            <h3>${getQuestionText(answer.questionId)}</h3>
                        </div>
                        <div class="card-body">
                            <p class="user-answer">🎀 Your Answer: ${answer.answer}</p>
                            <div class="analysis">${generateAnalysis(answer)}</div>
                        </div>
                    </section>
                `).join('')}
            </div>
            <div class="final-question">
                <h2>💌 Final Question for ${user.name} 💌</h2>
                <div class="button-container">
                    <button class="yes-btn">YES! 💞</button>
                    <button class="no-btn">NO 😜</button>
                </div>
            </div>
        `;

        initNoButton();
    }

    function initNoButton() {
        const noBtn = document.querySelector('.no-btn');
        let moveCount = 0;
        
        noBtn.addEventListener('mouseover', () => {
            if(moveCount < 10) {
                const x = Math.random() * (window.innerWidth - 100);
                const y = Math.random() * (window.innerHeight - 50);
                noBtn.style.position = 'absolute';
                noBtn.style.left = `${x}px`;
                noBtn.style.top = `${y}px`;
                noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                moveCount++;
            } else {
                noBtn.style.display = 'none';
                document.querySelector('.yes-btn').textContent = "Okay, I surrender! 💘";
            }
        });

        noBtn.addEventListener('click', () => {
            if(moveCount < 10) {
                alert("🏃💨 You can't catch me that easily!");
            }
        });
    }

    function generateAnalysis(answer) {
        // Add personalized analysis logic
        return "Your answer shows deep emotional intelligence...";
    }
});