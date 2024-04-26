const { app, BrowserWindow } = require('electron');
const db = require('./db.js'); // Importe o objeto com o método query

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    // Verifique se db.query é uma função antes de chamar
    if (typeof db.query === 'function') {
        db.query('SELECT * FROM usuarios', (error, results, fields) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error);
                return;
            }
            console.log('Resultados da consulta:', results);
        });
    } else {
        console.error('O método query não está definido no objeto do banco de dados.');
    }
}

function enableAutofill() {
    return new Promise((resolve, reject) => {
        resolve('Autofill enabled successfully.');
    });
}

app.whenReady().then(createWindow);
