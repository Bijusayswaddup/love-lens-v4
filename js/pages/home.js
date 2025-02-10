// Home page logic will go here
import { LoadingManager } from '../modules/loading.js';
import { Storage } from '../modules/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loadingManager = new LoadingManager();
    const storage = new Storage();
    
    // Initial loading simulation
    await loadingManager.simulateProgress(3000, 75, "💖 Tips: Good things come to those who wait...");
    
    // Show initial prompt
    const response = confirm("Are you ready for a surprise?");
    if (!response) {
        handleNoResponse();
    } else {
        await continueLoading();
    }

    async function continueLoading() {
        await loadingManager.simulateProgress(1000, 100, "💞 Finalizing the magic...");
        loadingManager.hideLoading();
        initHearts();
        initScrollListener();
    }

    function handleNoResponse() {
        let noCount = 0;
        const modal = document.createElement('div');
        // ... (modal creation logic with humor messages)
    }

    function initHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'hearts-container';
        document.body.appendChild(heartsContainer);
    
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 8000);
        }
        
        setInterval(createHeart, 300);
    }
    
    function initScrollListener() {
        let scrolled = false;
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                if (!scrolled) {
                    const response = confirm("Since you scrolled down... 💝 Ready for another surprise?");
                    if (response) {
                        window.location.href = 'questions.html';
                    } else {
                        const noBtn = document.querySelector('.cancel-btn');
                        noBtn.style.display = 'none';
                        alert("😏 No escape now! Let's continue...");
                        setTimeout(() => window.location.href = 'questions.html', 2000);
                    }
                    scrolled = true;
                }
            }
        });
    }
});
