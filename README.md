# ELECTRON.JS

Aplicativo desenvolvido para cadastrar pessoas em um sistema imaginário, onde fazemos o uso de uma API de CEP.
O programa possui uma tela de login, uma tela que direciona ao cadastro caso não possua o login, e a página pós-login.

Para baixar os pacotes do electron, de o seguinte comando no terminal:
```sh
npm install electron
```

Ao terminar de baixar, para iniciar o aplicativo basta executar o seguinte comando:

```sh
npm start
```

# MySQL

```sh
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xastre@aluno123',
    database: 'sistema-usuario'
});
```
