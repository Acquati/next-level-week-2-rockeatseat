import express, { response } from 'express';

const app = express();

app.use(express.json());

// Métodos API Rest
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

app.get('/users', (request, response) => {
  // Aparece no console do server:
  // console.log('Acessou a rota /users');

  // Aparece no navegador na forma de um html cru:
  // return response.send('Hello World!');

  console.log(request.query);

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

app.post('/users', (request, response) => {
  console.log(request.body);

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

app.delete('/users/:id', (request, response) => {
  console.log(request.params);

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

app.listen(3333);