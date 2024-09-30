const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Simulação de banco de dados para usuários (arquivo JSON)
const USERS_DB = path.join(__dirname, 'users.json');

// Função para gravar dados no arquivo JSON
function saveUserData(data) {
    fs.writeFileSync(USERS_DB, JSON.stringify(data, null, 2));
}

// Função para carregar dados do arquivo JSON
function loadUserData() {
    if (fs.existsSync(USERS_DB)) {
        return JSON.parse(fs.readFileSync(USERS_DB));
    }
    return [];
}

// Rota para registrar novos usuários
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Verifica se o usuário já existe
        const users = loadUserData();
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salvar o novo usuário no arquivo JSON
        users.push({ name, email, password: hashedPassword });
        saveUserData(users);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

// Rota de login (exemplo)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = loadUserData();

        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
