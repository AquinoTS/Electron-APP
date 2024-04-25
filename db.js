const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xastre@aluno123',
    database: 'sistema-usuario'
});

// Tentativa de conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados.');
});

module.exports = connection;