module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isAdmin: user => user && user.role === "ADMIN",
    isCurrentUser: (id, user) => user && user._id === id,
    isNotCurrentUser: (id, user) => user && user._id != id,
    emailIsValid: email => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
    getAge: dateString => {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age
    },
    compare: (a, b, rating) => {
        if (a.rating < b.rating) {
            return -1;
        }
        if (a.rating > b.rating) {
            return 1;
        }
        return 0;

    },
    isSender: (id, message) => message.sender && message.sender._id === id,
    isReceiver: (id, message) => message.receiver && message.receiver._id === id,
}