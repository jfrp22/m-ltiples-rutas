const validUsers = {
    admin: "admin123", // Texto plano (solo para pruebas)
    user: "password"
};

// Almacenamiento seguro
function setAuth(user) {
    const authData = {
        user: user,
        timestamp: Date.now(),
        token: btoa(user + ":" + validUsers[user])
    };
    localStorage.setItem('auth', JSON.stringify(authData));
}

function checkAuth() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (!authData) return false;
    
    // Verificar token y expiración (24 horas)
    const expectedToken = btoa(authData.user + ":" + validUsers[authData.user]);
    const isExpired = (Date.now() - authData.timestamp) > 86400000;
    
    return authData.token === expectedToken && !isExpired;
}

function clearAuth() {
    localStorage.removeItem('auth');
}

function authenticate(username, password) {
    if (validUsers[username] === password) {
        setAuth(username);
        return true;
    }
    return false;
}
