const express = require('express')
const {getCategories, getReviews, getReviewsByReviewId} = require('../controller/controller')
const app = express()

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get("/api/reviews/:review_id", getReviewsByReviewId)




app.use((err, request, response, next) => {
    if(err.code === "22P02") {
        response.status(400).send({msg: 'Bad Request'})
    } else {
        next(err)
    }
})

app.use((err, request, response, next) => {
    if(err.status) {
    response.status(err.status).send({err: err.msg})
    } else {
        next(err)
    }
})

app.use((err, request, response, next) => {
    response.status(500).send({msg: 'Internal Server Error'})
}) 


module.exports = app