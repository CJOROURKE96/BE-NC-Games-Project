const { response } = require('../app/app')
const {fetchCategories, fetchReviews, fetchReviewsByReviewId, fetchCommentsByReviewId} = require('../model/model')

function getCategories(request, response, next) {
fetchCategories().then((result) => {
    response.status(200).send(result)
}).catch(next)
}

function getReviews(request, response, next) {
    fetchReviews().then((result) => {
        response.status(200).send({reviews: result})
    }).catch(next)
}

function getReviewsByReviewId(request, response, next) {
    const {review_id} = request.params
    Promise.all([fetchReviewsByReviewId(review_id)])
    .then(([results]) => {
        const reviews = results
        response.status(200).send({review: reviews})
    }).catch(next)

    // ERROR TESTING ^^
    // number too big
    // string input
}


function getCommentsByReviewId(request, response, next) {
    const {review_id} = request.params
    fetchCommentsByReviewId(review_id).then((result) => {
        response.status(200).send({comments: result})
    }).catch(next)
}

module.exports = {getCategories, getReviews, getReviewsByReviewId, getCommentsByReviewId}