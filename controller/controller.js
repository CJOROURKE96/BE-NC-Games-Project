const { response } = require('../app/app')
const {fetchCategories, fetchReviews} = require('../model/model')

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

module.exports = {getCategories, getReviews}