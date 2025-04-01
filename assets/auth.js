// Credenciales (versión texto plano para pruebas)
const validUsers = {
    admin: "admin123",
    user: "password"
};

// Sistema de autenticación mejorado
let authChecked = false;

function setAuth(user) {
    sessionStorage.setItem('auth', 'true'); // Usa sessionStorage
    sessionStorage.setItem('user', user);
}

function checkAuth() {
    if (authChecked) return true; // Evita múltiples verificaciones
    
    const isAuthenticated = sessionStorage.getItem('auth') === 'true';
    authChecked = true;
    
    return isAuthenticated;
}

function clearAuth() {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('user');
    authChecked = false;
}

function authenticate(username, password) {
    if (validUsers[username] === password) {
        setAuth(username);
        return true;
    }
    return false;
}
