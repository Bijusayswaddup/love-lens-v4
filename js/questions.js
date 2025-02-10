document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const progressText = document.querySelector('.progress-text');
    const progressHeart = document.querySelector('.progress-heart');

    let currentQuestion = 0;
    let userAnswers = [];

    let allowBack = false;
    const LOADING_DELAY = 500;

    // Deep questions array
    const questions = [
        {
            id: 1,
            text: "💖 What first made you feel a special connection with someone?",
            options: [
                "Their kindness and empathy",
                "Shared interests and values",
                "Their sense of humor",
                "A deep, unexplainable feeling"
            ]
        },
        {
            id: 2,
            text: "🌟 How do you show someone they're important to you?",
            options: [
                "Through thoughtful actions",
                "By spending quality time",
                "With verbal affirmations",
                "Physical touch and closeness"
            ]
        },
        {
            id: 3,
            text: "🌹 What's your ideal way to build a deep connection?",
            options: [
                "Heart-to-heart conversations",
                "Shared experiences and adventures",
                "Supporting each other's growth",
                "Quiet moments of understanding"
            ]
        },
        {
            id: 4,
            text: "💭 When do you feel most emotionally safe?",
            options: [
                "When being completely authentic",
                "During mutual vulnerability",
                "When receiving undivided attention",
                "In moments of silent companionship"
            ]
        },
        {
            id: 5,
            text: "🎀 What's the most important aspect of love to you?",
            options: [
                "Trust and respect",
                "Passion and excitement",
                "Comfort and security",
                "Growth and inspiration"
            ]
        }
    ];

    // Check for existing user
    let user = getUser();
    if (!user) {
        getUserName();
    } else {
        loadQuestion();
    }

    function getUserName() {
        const name = prompt("🌸 Please enter your name to begin:");
        if (name) {
            user = createUser(name);
            loadQuestion();
        } else {
            alert("💌 We need your name to personalize this experience!");
            getUserName();
        }
    }

    function loadQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = question.text;
        progressText.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
        const questionImage = question.image ?
            `<img src="../../assets/images/${question.image}" class="question-image">` : '';

        questionText.innerHTML = `
        ${questionImage}
        <div class="question-text-content">${question.text}</div>
        `;

        // Heart animation
        progressHeart.style.animation = 'none';
        setTimeout(() => progressHeart.style.animation = 'heartbeat 1.2s infinite', 10);

        optionsContainer.innerHTML = '';
        if(currentQuestion > 0) {
            optionsContainer.appendChild(createBackButton());
        }
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `${['💞', '💓', '💕', '💗'][index]} ${option}`;
            btn.addEventListener('click', () => handleAnswer(question.id, option));
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(questionId, answer) {
        userAnswers.push({ questionId, answer });
        saveAnswer(questionId, answer);

        // Animate out current question
        document.querySelector('.question-container').style.transform = 'translateX(-100vw)';
        document.querySelector('.question-container').style.opacity = '0';

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
                // Reset container position
                document.querySelector('.question-container').style.transform = 'translateX(100vw)';
                setTimeout(() => {
                    document.querySelector('.question-container').style.transform = 'translateX(0)';
                    document.querySelector('.question-container').style.opacity = '1';
                }, 50);
            } else {
                showCompletion();
            }
        }, 500);

        showLoadingTransition().then(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                allowBack = true;
                loadQuestion();
            } else {
                showAnswerSummary();
            }
        });
    }

    function showLoadingTransition() {
        return new Promise(resolve => {
            document.querySelector('.question-container').classList.add('fade-out');
            setTimeout(() => {
                document.querySelector('.question-container').classList.remove('fade-out');
                resolve();
            }, LOADING_DELAY);
        });
    }

    function createBackButton() {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.innerHTML = '← Previous';
        backBtn.addEventListener('click', () => {
            if (currentQuestion > 0 && allowBack) {
                currentQuestion--;
                loadQuestion();
            }
        });
        return backBtn;
    }

    function showAnswerSummary() {
        const summaryHTML = `
            <div class="summary-container">
                <h2>📝 Your Love Profile</h2>
                <div class="summary-content">
                    ${userAnswers.map((answer, index) => `
                        <div class="summary-item">
                            <div class="question-number">Q${index + 1}</div>
                            <div class="summary-text">
                                <h3>${questions[index].text}</h3>
                                <p>Your answer: <span class="highlight">${answer.answer}</span></p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="proceed-btn">See Your Results →</button>
            </div>
        `;

        document.body.innerHTML = summaryHTML;

        document.querySelector('.proceed-btn').addEventListener('click', () => {
            document.body.innerHTML = `
                <div class="final-loading">
                    <div class="spinner">💖</div>
                    <p>Analyzing your love patterns...</p>
                </div>
            `;
            setTimeout(() => window.location.href = "../results/index.html", 3000);
        });
    }

    function showCompletion() {
        const completionHTML = `
            <div class="completion-screen">
                <h2>🎉 Amazing Journey, ${user.name}! 🎉</h2>
                <div class="hearts">💖💖💖</div>
                <p>We're crafting your unique love profile...</p>
                <div class="countdown">Redirecting in 5</div>
            </div>
        `;
        document.body.innerHTML = completionHTML;

        let count = 5;
        const countdown = document.querySelector('.countdown');
        const interval = setInterval(() => {
            count--;
            countdown.textContent = `Redirecting in ${count}`;
            if (count <= 0) {
                clearInterval(interval);
                window.location.href = "../results/index.html";
            }
        }, 1000);
    }
});