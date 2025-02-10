// Storage logic will go here
class Storage {
    constructor() {
        this.USER_KEY = 'valentineUsers';
    }

    save(key, data) {
        const allUsers = JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
        allUsers[key] = data;
        localStorage.setItem(this.USER_KEY, JSON.stringify(allUsers));
    }

    get(key) {
        const allUsers = JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
        return allUsers[key];
    }

    getAllUsers() {
        const users = JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
        return Object.values(users);
    }
}