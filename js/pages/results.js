// Results page logic will go here
import { LoadingManager } from '../modules/loading.js';
import { Storage } from '../modules/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loadingManager = new LoadingManager();
    const storage = new Storage();
    
    await loadingManager.simulateProgress(2000, 100, "💝 Preparing your unique love profile...");
    loadingManager.hideLoading();

    const userData = storage.get('currentUser');
    const container = document.querySelector('.results-container');
    
    // Show results
    userData.answers.forEach((answer, index) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3>Question ${index + 1}: ${answer.question}</h3>
            <p>Your answer: ${answer.answer}</p>
            <div class="analysis">${getAnalysis(answer)}</div>
        `;
        container.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 * index);
    });

    // Final prompt logic
    window.addEventListener('scroll', showFinalPrompt);
});

function getAnalysis(answer) {
    const analyses = {
        "Their smile 😊": "You appreciate the simple joys in life! A warm smile lights up your world 🌞",
        "Their intelligence 🧠": "You value deep connections and stimulating conversations 💡",
        // Add analyses for all possible answers
    };
    return analyses[answer.answer] || "This answer reveals your unique perspective on love 💖";
}

function showFinalPrompt() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        window.removeEventListener('scroll', showFinalPrompt);
        
        setTimeout(() => {
            const prompt = document.createElement('div');
            prompt.className = 'final-prompt';
            prompt.innerHTML = `
                <h2>For ${userData.name}... 💌</h2>
                <div class="heart-explosion"></div>
                <p>After all we've shared...</p>
                <button id="yesBtn" class="yes-btn">YES! 💘</button>
                <button id="noBtn" class="no-btn">No 😢</button>
            `;
            document.body.appendChild(prompt);

            let noCount = 0;
            const noBtn = document.getElementById('noBtn');
            const hearts = document.querySelector('.heart-explosion');

            noBtn.addEventListener('mouseover', () => {
                if(noCount < 10) {
                    noBtn.style.transform = `translate(
                        ${Math.random() * 80 - 40}vw,
                        ${Math.random() * 80 - 40}vh
                    )`;
                    createHeart(hearts);
                }
            });

            noBtn.addEventListener('click', () => {
                noCount++;
                if(noCount >= 10) {
                    noBtn.disabled = true;
                    noBtn.innerHTML = "OKAY FINE YES! 💖";
                    noBtn.style.transform = "none";
                    noBtn.classList.add('yes-btn');
                }
            });

            document.getElementById('yesBtn').addEventListener('click', () => {
                showCelebration();
                setTimeout(() => {
                    prompt.remove();
                    alert("🎉 BEST ANSWER EVER! You've made someone very happy! 💞");
                }, 2000);
            });
        }, 1000);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'confetti-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 1 + 's';
    heart.innerHTML = '💖';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

function showCelebration() {
    const interval = setInterval(() => createHeart(document.body), 100);
    setTimeout(() => clearInterval(interval), 3000);
}