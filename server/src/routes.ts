import express, { request, response } from 'express';
import db from './database/connection';
import convertHourToMinutes from './util/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = request.body;

  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to)
      };
    });

    await trx('class_schedule').insert(classSchedule);

    await trx.commit();

    return response.status(201).send();
  } catch (err) {
    console.log(err);

    await trx.rollback();

    return response.status(400).json({
      error: 'Unexpected error while creating new class'
    });
  }
});

// Métodos API Rest
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

routes.get('/users', (request, response) => {
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

routes.post('/users', (request, response) => {
  console.log(request.body);

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

routes.delete('/users/:id', (request, response) => {
  console.log(request.params);

  const users = [
    { name: 'Diego', age: 25 },
    { name: 'Vini', age: 21 }
  ];

  return response.json(users);
});

export default routes;