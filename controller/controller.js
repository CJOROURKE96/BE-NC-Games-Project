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
    const {review_id} = request.params
    Promise.all([fetchReviewsByReviewId(review_id), addCommentByReviewId(review_id, request.body)]).then((result) => {
        response.status(201).send({comment: result[1]})
    }).catch(next)

function patchReview(request, response, next) {
    const {review_id} = request.params
    const {inc_votes} = request.body
    updateReview(review_id, inc_votes).then((result) => {
        response.status(202).send(result)
    }).catch(next)
}

module.exports = {getCategories, getReviews, getReviewsByReviewId, getCommentsByReviewId, postCommentByReviewId, patchReview}

