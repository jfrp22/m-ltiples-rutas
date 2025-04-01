// Credenciales válidas (hash MD5)
const validUsers = {
    admin: "a66d94e0b6ab781584c0a5c7d7f8282e", // MD5 de "admin123"
    user: "5f4dcc3b5aa765d61d8327deb882cf99"   // MD5 de "password"
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

// Versión con logs para depuración
function authenticate(username, password) {
    console.log("Usuario ingresado:", username);
    console.log("Contraseña ingresada:", password);
    
    const md5Password = CryptoJS.MD5(password).toString();
    console.log("Hash generado:", md5Password);
    
    if (validUsers[username] === md5Password) {
        console.log("¡Autenticación exitosa!");
        setAuth(username);
        return true;
    } else {
        console.log("Hash esperado para", username, ":", validUsers[username]);
        return false;
    }
}
