// Initialize storage if empty
function initStorage() {
    if(!localStorage.getItem('valentineData')) {
        localStorage.setItem('valentineData', JSON.stringify({
            users: [],
            currentUser: null
        }));
    }
}

function createUser(name) {
    const data = JSON.parse(localStorage.getItem('valentineData'));
    const newUser = {
        id: Date.now(),
        name: name,
        answers: [],
        timestamp: new Date().toISOString()
    };
    data.users.push(newUser);
    data.currentUser = newUser.id;
    localStorage.setItem('valentineData', JSON.stringify(data));
    return newUser;
}

function saveAnswer(questionId, answer) {
    const data = JSON.parse(localStorage.getItem('valentineData'));
    const user = data.users.find(u => u.id === data.currentUser);
    if(user) {
        user.answers.push({
            questionId,
            answer,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('valentineData', JSON.stringify(data));
    }
}

// Add these functions to data.js
function getUser() {
    const data = JSON.parse(localStorage.getItem('valentineData'));
    return data.users.find(u => u.id === data.currentUser);
}

function getCurrentUser() {
    const data = JSON.parse(localStorage.getItem('valentineData'));
    return data.currentUser;
}

// Add this to home.js after DOMContentLoaded
initStorage();

