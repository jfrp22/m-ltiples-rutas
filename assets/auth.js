// Usuarios válidos (en un caso real, usa hashes)
const validUsers = {
    admin: 'a66d94e0b6ab781584c0a5c7d7f8282e', // MD5 de "admin123"
    user: '5f4dcc3b5aa765d61d8327deb882cf99'  // MD5 de "password"
};
 
// Almacenamiento seguro (encriptación básica)
function setAuth(user) {
    const authData = {
        user,
        timestamp: Date.now(),
        token: btoa(user + ':' + validUsers[user])
    };
    localStorage.setItem('auth', JSON.stringify(authData));
}

function checkAuth() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (!authData) return false;
    
    // Verificar token y expiración (24 horas)
    const expectedToken = btoa(authData.user + ':' + validUsers[authData.user]);
    return authData.token === expectedToken && 
           (Date.now() - authData.timestamp) < 86400000;
}

function clearAuth() {
    localStorage.removeItem('auth');
}

function authenticate(username, password) {
    // En un caso real, usa SHA-256 o similar
    const md5Password = CryptoJS.MD5(password).toString();
    
    if (validUsers[username] === md5Password) {
        setAuth(username);
        return true;
    }
    return false;
}
