'use strict'

import 'babel-polyfill'
import contr from '../exercise_api/controller.mjs'
import model from '../exercise_api/model.mjs'
import mongoose from 'mongoose'
import supertest from 'supertest'


const EXERCISES = [
  { name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21' },
  { name: 'Squats', reps: 10, weight: 240, unit: 'lbs', date: '08-30-21' },
  { name: 'Curls', reps: 8, weight: 30, unit: 'lbs', date: '09-30-21' }
]


beforeEach((done) => {
    mongoose.connect(
      model.MONGO_CONN, 
      { useNewUrlParser: true }, 
      () => done()
    )
  })

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    })
    contr.server.close()
})


describe('Test Model', () => {

  test('Test creation of exercise', async () => {
    const query = {name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21'}
    let exercise = await model.createExercise(query)
    expect(exercise).toMatchObject(query)
  })

  test('Test deletion of exercise that exist', async () => {
    const query = {name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21'}
    let exercise = await model.createExercise(query)
    let deleteCount = (await model.deleteExercise(exercise.id)).deletedCount
    expect(deleteCount).toBe(1)
  })

  test("Test deletion of exercise that doesn't exist", async () => {
    let _id = mongoose.Types.ObjectId()
    let deleteCount = (await model.deleteExercise(_id)).deletedCount
    expect(deleteCount).toBe(0)
  })

  test("Test retrieval of exercises", async () => {
    await model.createExercises(EXERCISES)
    let exercises = await model.getExercises()
    expect(exercises).toMatchObject(EXERCISES)
  })
})


describe('Test API', () => {

  test('Test create exercise', async () => {
    const exercise = {name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21'}
    await supertest(contr.app).post(contr.API_ENDPOINT)
      .send(exercise)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(resp => {
        expect(resp.body).toMatchObject(exercise)
      })
    })

  test('Test read exercises', async () => {
    await model.createExercises(EXERCISES)
    await supertest(contr.app).get(contr.API_ENDPOINT)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(resp => {
        expect(resp.body).toMatchObject(EXERCISES)
      })
    })

  test('Test read zero exercises', async () => {
    await supertest(contr.app).get(contr.API_ENDPOINT)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(resp => {
        expect(resp.body).toEqual([])
      })
    })

  test('Test update exercise', async () => {
    let exercise = await model.createExercise({ name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21' })
    await supertest(contr.app).put(`${contr.API_ENDPOINT}/${exercise.id}`)
      .send({ name: 'Incline Bench Press' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        let expected = { name: 'Incline Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21' }
        expect(resp.body).toMatchObject(expected)
      })
    await supertest(contr.app).put(`${contr.API_ENDPOINT}/${exercise.id}`)
      .send({ name: 'Bench Press', date: '07-01-21' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        let expected = { name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-01-21' }
        expect(resp.body).toMatchObject(expected)
      })
    await supertest(contr.app).put(`${contr.API_ENDPOINT}/${exercise.id}`)
      .send({ name: 'Squats', reps: 10, weight: 240, unit: 'lbs', date: '08-30-21' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(resp => {
        let expected = { name: 'Squats', reps: 10, weight: 240, unit: 'lbs', date: '08-30-21' }
        expect(resp.body).toMatchObject(expected)
      })
    })

  test('Test delete exercise', async () => {
      await model.createExercises(EXERCISES)
      let exercises = await model.getExercises()
      await supertest(contr.app).delete(`${contr.API_ENDPOINT}/${exercises[0].id}`).expect(204)
      expect((await model.getExercises()).length).toBe(2)
      let updated_exercises = await model.getExercises()
      expect(updated_exercises).toMatchObject(EXERCISES.slice(1))
    })
})