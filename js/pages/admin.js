import { Storage } from '../modules/storage.js';

class AdminDashboard {
    constructor() {
        this.storage = new Storage();
        this.users = [];
        this.searchInput = document.getElementById('searchInput');
        this.userGrid = document.getElementById('userGrid');
        this.init();
    }

    init() {
        this.loadUsers();
        this.setupSearch();
        this.updateStats();
    }

    loadUsers() {
        this.users = this.storage.getAllUsers();
        this.renderUsers(this.users);
    }

    renderUsers(users) {
        this.userGrid.innerHTML = '';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <div class="answers">
                    ${user.answers.map(answer => `
                        <div class="answer-item">
                            <strong>Q:</strong> ${answer.question}<br>
                            <strong>A:</strong> ${answer.answer}
                        </div>
                    `).join('')}
                </div>
            `;
            this.userGrid.appendChild(userCard);
        });
    }

    updateStats() {
        document.getElementById('totalUsers').textContent = this.users.length;
        
        const positiveAnswers = this.users.filter(user => 
            user.answers.some(answer => 
                answer.answer.includes('💘') || 
                answer.answer.toLowerCase().includes('yes')
            )
        ).length;
        
        const positiveRate = (positiveAnswers / this.users.length * 100 || 0).toFixed(1);
        document.getElementById('positiveRate').textContent = `${positiveRate}%`;
    }

    setupSearch() {
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredUsers = this.users.filter(user => 
                user.name.toLowerCase().includes(searchTerm) ||
                user.answers.some(answer => 
                    answer.question.toLowerCase().includes(searchTerm) ||
                    answer.answer.toLowerCase().includes(searchTerm)
                )
            );
            this.renderUsers(filteredUsers);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});