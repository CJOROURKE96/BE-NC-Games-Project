const { response } = require('../app/app')
const {fetchCategories, fetchReviews, fetchCommentsByReviewId} = require('../model/model')

function getCategories(request, response, next) {
fetchCategories().then((result) => {
    response.status(200).send(result)
}).catch(next)
}

function getReviews(request, response, next) {
    fetchReviews().then((result) => {
        response.status(200).send(result)
    }).catch(next)
}

function getCommentsByReviewId(request, response, next) {
    const {review_id} = request.params
    console.log(review_id, "<-- ID")
    fetchCommentsByReviewId().then((result) => {
        console.log(result, "<-- Controller")
        response.status(200).send({comments: [result]})
    }).catch(next)
}

module.exports = {getCategories, getReviews, getCommentsByReviewId}