const express = require('express')
const {getCategories, getReviews, getCommentsByReviewId} = require('../controller/controller')
const app = express()

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)



app.get('/api/reviews/:review_id/comments', getCommentsByReviewId)


app.use((err, request, response, next) => {
    console.log(err)
if(err.status) {
    response.status(err.status).send({msg: err})
} else {
    next(err)
}
})

app.use((err, request, response, next) => {
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