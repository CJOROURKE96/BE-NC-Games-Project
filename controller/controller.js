const { response } = require('../app/app')
const {fetchCategories} = require('../model/model')

function getCategories(request, response, next) {
fetchCategories().then((result) => {
    response.status(200).send(result)
}).catch(next)
}

module.exports = {getCategories}