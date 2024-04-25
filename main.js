const { app, BrowserWindow } = require('electron');
const db = require('./db.js');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    // Exemplo de uso da conexão com o banco de dados
    db.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            return;
        }
        console.log('Resultados da consulta:', results);
    });
}

app.whenReady().then(createWindow);
