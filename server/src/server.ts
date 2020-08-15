import express, { response } from 'express';

const app = express();

// Métodos API Rest
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

app.get('/users', (request, response) => {
  // Aparece no console do server:
  // console.log('Acessou a rota /users');

  // Aparece no navegador na forma de um html cru:
  // return response.send('Hello World!');

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

app.post('/users', (request, response) => {
  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

app.listen(3333);