const express = require('express')
const {getCategories, getReviews} = require('../controller/controller')
const app = express()

app.get('/api/categories', getCategories)
// return all
// plus comment count AS comment_count (WHERE comments.review_id === reviews.review_id)
// created_at in DESC order
app.get('/api/reviews', getReviews)


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