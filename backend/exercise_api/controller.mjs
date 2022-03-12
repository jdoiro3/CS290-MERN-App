'use strict'

// for testing
import 'babel-polyfill'
// regular imports
import express from 'express'
import bodyParser from 'body-parser'
import model from './model.mjs'

// constants

const app = express()
const PORT = 3000
const API_ENDPOINT = '/exercises'
const jsonParser = bodyParser.json()


// API CRUD operations

app.post(API_ENDPOINT, jsonParser, (req, res) => {
    model.createExercise(req.body)
        .then(exercise => {
            res.status(201).type('json').json(exercise)
        })
        .catch(error => {
            console.log(req.body)
            res.status(400).json({ error })
        })
})


app.get(API_ENDPOINT, (req, res) => {
    model.getExercises()
        .then(exercises => {
            res.status(201).type('json').json(exercises)
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error })
        })
})


app.put(`${API_ENDPOINT}/:_id`, jsonParser, (req, res) => {
    model.updateExercise({...req.params, ...req.body})
        .then(exercise => {
            res.status(200).type('json').json(exercise)
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

app.delete(`${API_ENDPOINT}/deleteAll`, (req, res) => {
    model.deleteAll()
        .then(
            res.status(204).send()
        )
        .catch(error => {
            res.status(400).json({ error })
        })
})

app.delete(`${API_ENDPOINT}/:_id`, (req, res) => {
    model.deleteExercise(req.params._id)
        .then(
            res.status(204).send()
        )
        .catch(error => {
            res.status(400).json({ error })
        })
})

let server = app.listen(PORT, () => {
    console.log(`REST API listening at http://localhost:${PORT}...`);
})

export default { app, server, API_ENDPOINT }