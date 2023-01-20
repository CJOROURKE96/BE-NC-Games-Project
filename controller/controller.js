const { response } = require('../app/app')
const {fetchCategories, fetchReviews, fetchReviewsByReviewId, fetchCommentsByReviewId, addCommentByReviewId, updateReview} = require('../model/model')


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
    fetchReviewsByReviewId(review_id)
    .then((results) => {
        const reviews = results
        response.status(200).send({review: reviews})
    }).catch(next)
}



function getCommentsByReviewId(request, response, next) {
    const {review_id} = request.params
    Promise.all([fetchCommentsByReviewId(review_id), fetchReviewsByReviewId(review_id)]).then(([result]) => {
        response.status(200).send({comments: result})
    }).catch(next)
}

function postCommentByReviewId(request, response, next) {
    addCommentByReviewId().then((result) => {

    })
}

function patchReview() {
    const {review_id} = request.params
    updateReview(review_id).then((result) => {
        console.log(result, "<--- CONTROLLER")
    })
}

module.exports = {getCategories, getReviews, getReviewsByReviewId, getCommentsByReviewId, postCommentByReviewId, patchReview}

