const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES; // Adicionando esta linha para importar TYPES

const app = express();
const port = 5000;

// Configuração da conexão com o banco de dados MySQL
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'xastre@aluno123',
    database: 'sistema-usuario'
};

// Criação da conexão com o banco de dados MySQL
const mysqlConnection = mysql.createConnection(mysqlConfig);

// Tentativa de conexão com o MySQL
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL.');
});


// Criação da conexão com o banco de dados SQL Server
const sqlServerConfig = {
    userName: 'xx',
    password: 'xxxx',
    server: 'xxxxxx', // Você pode usar 'localhost\\instance' para conectar-se a uma instância nomeada
    database: 'XXXXX',
    options: {
        database: 'XXXXX'
    }
};

// Criação da conexão com o banco de dados SQL Server
const sqlServerConnection = new Connection(sqlServerConfig);

// Tentativa de conexão com o SQL Server
sqlServerConnection.on('connect', function(err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQL Server:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados SQL Server.');
});

app.use(bodyParser.json());

// Rota para cadastrar usuário
app.post('/cadastrar-usuario', (req, res) => {
    const { nome, email, senha, cep, rua, bairro, localidade, uf } = req.body;

    // Execução da query SQL para inserir os dados do usuário no MySQL
    mysqlConnection.query('INSERT INTO usuarios (nome, email, senha, cep, rua, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [nome, email, senha, cep, rua, bairro, localidade, uf], 
        (error, results, fields) => {
            if (error) {
                console.error('Erro ao cadastrar usuário no MySQL:', error);
                res.status(500).json({ message: 'Erro ao cadastrar usuário no MySQL. Por favor, tente novamente.' });
            } else {
                console.log('Usuário cadastrado com sucesso no MySQL!');
                // Execução da query SQL para inserir os dados do usuário no SQL Server
                const request = new Request("INSERT INTO XXXXX VALUES (@cep, @rua, @bairro, @localidade, @uf)",
                    function(err, rowCount, rows) {
                        if (err) {
                            console.error('Erro ao cadastrar usuário no SQL Server:', err);
                            res.status(500).json({ message: 'Erro ao cadastrar usuário no SQL Server. Por favor, tente novamente.' });
                        } else {
                            console.log('Usuário cadastrado com sucesso no SQL Server!');
                            res.status(201).json({ message: 'Usuário cadastrado com sucesso no MySQL e no SQL Server!' });
                        }
                    });

                // Adiciona parâmetros à query SQL do SQL Server
                request.addParameter('cep', TYPES.VarChar, cep, { collation: 'Latin1_General_CI_AS' });
                request.addParameter('rua', TYPES.VarChar, rua);
                request.addParameter('bairro', TYPES.VarChar, bairro);
                request.addParameter('localidade', TYPES.VarChar, localidade);
                request.addParameter('uf', TYPES.VarChar, uf);

                // Executa a query SQL do SQL Server
                sqlServerConnection.execSql(request);
            }
        });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = { mysqlConnection, sqlServerConnection };
