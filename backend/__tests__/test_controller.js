'use strict'

import 'babel-polyfill'
import app from '../exercise_api/controller.mjs'
import model from '../exercise_api/model.mjs'
import mongoose from 'mongoose'
import supertest from 'supertest'


beforeEach((done) => {
    mongoose.connect(model.MONGO_CONN, { useNewUrlParser: true }, () => done());
  });

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    })
    app.server.close()
})