const express = require('express')

const {getCategories, getReviews, getReviewsByReviewId, getCommentsByReviewId, postCommentByReviewId} = require('../controller/controller')

const app = express()

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get("/api/reviews/:review_id", getReviewsByReviewId)

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId)

app.post('/api/reviews/:review_id/comments', postCommentByReviewId)


app.use((err, request, response, next) => {
if(err.status) {
    response.status(err.status).send({msg: err.msg})
} else {
    next(err)
}
})


app.use((err, request, response, next) => {
    if(err.code === "22P02") {
        response.status(400).send({msg: 'Bad Request'})
    } else {
        next(err)
    }
})



app.use((err, request, response, next) => {
    response.status(500).send({msg: 'Internal Server Error'})
}) 


module.exports = app