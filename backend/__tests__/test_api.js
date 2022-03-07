'use strict'

import 'babel-polyfill'
import contr from '../exercise_api/controller.mjs'
import model from '../exercise_api/model.mjs'
import mongoose from 'mongoose'
import supertest from 'supertest'


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
    await model.createExercise({name: 'Bench Press', reps: 6, weight: 120, unit: 'lbs', date: '07-30-21'})
    await model.createExercise({name: 'Squats', reps: 10, weight: 240, unit: 'lbs', date: '08-30-21'})
    await model.createExercise({name: 'Curls', reps: 8, weight: 30, unit: 'lbs', date: '09-30-21'})
    let exerciseCount = (await model.getExercises()).length
    expect(exerciseCount).toBe(3)
  })
})

/*
describe('Test Create CRUD Operations', () => {
  test()
})

describe('Test Read CRUD Operations', () => {
  test()
})

describe('Test Update CRUD Operations', () => {
  test()
})

describe('Test Delete CRUD Operations', () => {
  test()
})
*/