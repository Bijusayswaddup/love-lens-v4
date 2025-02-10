document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('valentineData')) || { users: [] };
    const userList = document.querySelector('.user-list');
    const answerDetails = document.querySelector('.answer-details');

    // Password protection
    const password = prompt("🔒 Enter Admin Password:");
    if(password !== "Love123") {
        alert("❌ Access Denied!");
        window.location.href = "../home/index.html";
        return;
    }

    function displayUsers() {
        userList.innerHTML = data.users.map(user => `
            <div class="user-card">
                <h3>👤 ${user.name}</h3>
                <p>📅 ${new Date(user.timestamp).toLocaleDateString()}</p>
                <button class="view-btn" data-id="${user.id}">View Answers</button>
            </div>
        `).join('');

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => showUserAnswers(btn.dataset.id));
        });
    }

    function showUserAnswers(userId) {
        const user = data.users.find(u => u.id == userId);
        answerDetails.innerHTML = `
            <h2>📝 ${user.name}'s Answers</h2>
            ${user.answers.map(answer => `
                <div class="answer-card">
                    <p class="question">${getQuestionText(answer.questionId)}</p>
                    <p class="answer">💬 ${answer.answer}</p>
                </div>
            `).join('')}
        `;
    }

    displayUsers();
});