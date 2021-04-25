module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isAdmin: user => user && user.role === "ADMIN",
    isCurrentUser: (id, user) => user && user._id === id,
}