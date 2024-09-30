class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    registerUser(name, email, password, confirmPassword) {
        if (this.isEmailRegistered(email)) {
            this.showError('Email já está registrado.');
            return;
        }

        if (!this.validatePassword(password, confirmPassword)) {
            this.showError('As senhas não coincidem.');
            return;
        }

        const newUser = new User(name, email, password);
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        alert('Usuário cadastrado com sucesso!');
    }

    loginUser(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            alert('Login bem-sucedido!');
            window.location.href = 'main.html';  // Redireciona para a página principal
        } else {
            this.showError('Email ou senha inválidos.');
        }
    }

    isEmailRegistered(email) {
        return this.users.some(user => user.email === email);
    }

    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    showError(message) {
        const toastElement = document.getElementById('errorToast');
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
}

// Instanciando a classe Auth
const auth = new Auth();

// Formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    auth.registerUser(name, email, password, confirmPassword);
});

// Formulário de login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.loginUser(email, password);
});
