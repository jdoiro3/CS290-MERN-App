'use strict'

import mongoose from 'mongoose';

// constants and helpers

const MONGO_PORT = 27017
const MONGO_CONN = `mongodb://localhost:${MONGO_PORT}/users_db`

const removeUndefined = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}


mongoose.connect(MONGO_CONN, { useNewUrlParser: true })
const db = mongoose.connection

// on open event listener
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!')
    console.log(`Server listening on port ${MONGO_PORT}...`)
})

// define schema

const exerciseSchema = mongoose.Schema({
  name: {type: String, required: true},
  unit: {type: String, required: true},
  date: {type: String, required: true},
  reps: {type: Number, required: true},
  weight: {type: Number, required: true},
})

const Exercise = mongoose.model("Exercise", exerciseSchema)


// model functions

async function createExercise(query) {
  const exercise = new Exercise(removeUndefined(query))
  return exercise.save()
}


async function createExercises(exercises) {
  for (const exrs of exercises) {
    await createExercise(exrs)
  }
}


async function getExercises() {
  return Exercise.find({}).exec()
}


async function updateExercise(query) {
  const { _id, ...updates } = removeUndefined(query)
  return Exercise.findOneAndUpdate({ _id }, updates, { returnOriginal: false })
}


async function deleteExercise(_id) {
  return Exercise.deleteOne({ _id })
}

async function deleteAll() {
  return Exercise.deleteMany({})
}


export default { 
  createExercise, createExercises, deleteExercise, deleteAll, getExercises, updateExercise, MONGO_CONN
}