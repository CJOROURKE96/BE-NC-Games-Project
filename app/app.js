const express = require('express')
const {getCategories} = require('../controller/controller')
const app = express()

app.get('/api/categories', getCategories)


app.use((err, request, response, next) => {
    console.log(err)
if(err.status) {
    response.status(err.status).send({msg: err})
} else {
    next(err)
}
})

app.use((err, request, response, next) => {
    console.log("hello")
    if(err.status === "22P02") {
        response.status(400).send({msg: 'Bad Request'})
    } else {
        next(err)
    }
})

app.use((err, request, response, next) => {
    console.log(err)
    err.status(500).send({msg: 'Internal Server Error'})
})

module.exports = app