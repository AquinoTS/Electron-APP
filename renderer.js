const db = require('./main.js');
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var rua = document.getElementById('rua').value;
    var bairro = document.getElementById('bairro').value;
    var localidade = document.getElementById('localidade').value;
    var uf = document.getElementById('uf').value;

    // Cria um objeto com os dados do usuário
    var usuario = {
        nome: nome,
        email: email,
        senha: senha,
        cep: cep,
        rua: rua,
        bairro: bairro,
        localidade: localidade,
        uf: uf
    };

    // Envia os dados do usuário para o backend
    fetch('/cadastrar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        // Trata a resposta do backend aqui
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
    });
});

