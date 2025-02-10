// Home page logic will go here
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const mainContent = document.querySelector('.main-content');
    let noCount = 0;

    // Simulate loading
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;

        if (progress >= 75) {
            clearInterval(loadInterval);
            showSurprisePrompt();
        }
    }, 30);

    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heartsContainer.appendChild(heart);
        }
    }

    function showSurprisePrompt() {
        const response = confirm("💖 Are you ready for a magical journey?");
        handleResponse(response);
    }

    function handleResponse(response) {
        if (response) {
            completeLoading();
        } else {
            noCount++;
            const messages = [
                "😢 But the love birds are waiting!",
                "🐾 Please give it a chance!",
                "🌸 Pretty please with a cherry on top?",
                "💌 Your heart says yes, I know it!"
            ];

            if (noCount >= 10) {
                alert("😜 Okay Cupid's taking over! Ready or not...");
                completeLoading();
            } else {
                alert(messages[Math.floor(Math.random() * messages.length)]);
                showSurprisePrompt();
            }
        }
    }

    function completeLoading() {
        loadingScreen.classList.remove('active');
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        createHearts();
        // Add scroll down animation
        setTimeout(() => {
            alert("🌟 Scroll down to discover more love! 💕");
        }, 1000);
    }

    // Add after completeLoading function
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    let promptShown = false;

    function checkScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !promptShown) {
            promptShown = true;
            showFinalPrompt();
        }
    }

    function showFinalPrompt() {
        const modal = document.createElement('div');
        modal.className = 'final-prompt';
        modal.innerHTML = `
        <div class="prompt-content">
            <h3>🎉 You've reached the end!</h3>
            <p>Ready for your final surprise? 💝</p>
            <div class="prompt-buttons">
                <button class="yes-btn">Yes! 🥳</button>
                <button class="no-btn">No 😅</button>
            </div>
        </div>
    `;

        document.body.appendChild(modal);

        let moveCount = 0;
        const noBtn = modal.querySelector('.no-btn');

        noBtn.addEventListener('mouseover', () => {
            if (moveCount < 10) {
                noBtn.style.transform = `translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
            )`;
                moveCount++;
            } else {
                noBtn.style.display = 'none';
                modal.querySelector('.yes-btn').textContent = "Okay, I'll say yes! 😜";
            }
        });

        modal.querySelector('.yes-btn').addEventListener('click', () => {
            window.location.href = "../questions/index.html";
        });
    }

    // Initialize after content loads
    function completeLoading() {
        // ... previous code ...
        initScrollAnimations();
        window.addEventListener('scroll', checkScroll);
    }
});