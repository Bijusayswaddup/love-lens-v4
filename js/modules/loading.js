// Loading logic will go here
class LoadingManager {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressBar = document.querySelector('.progress-bar');
        this.loadingText = document.querySelector('.loading-text');
    }

    simulateProgress(duration, targetPercentage, text) {
        return new Promise(resolve => {
            const start = Date.now();
            const initialWidth = parseFloat(this.progressBar.style.width) || 0;
            
            const update = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                const currentWidth = initialWidth + (targetPercentage - initialWidth) * progress;
                
                this.progressBar.style.width = `${currentWidth}%`;
                this.loadingText.textContent = text;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(update);
        });
    }

    hideLoading() {
        this.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.querySelector('main').classList.remove('hidden');
        }, 500);
    }
}