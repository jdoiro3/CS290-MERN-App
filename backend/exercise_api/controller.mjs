'use strict'

// for testing
import 'babel-polyfill'
// imports
import express from 'express'
import model from './model.mjs'

// constants

const app = express()
const PORT = 3000


// API endpoints

/*
    Implement the REST API endpoints
*/


let server = app.listen(PORT, () => {
    console.log(`REST API listening at http://localhost:${PORT}...`);
})

export default { app, server }