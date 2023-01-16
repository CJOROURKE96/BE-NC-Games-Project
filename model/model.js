const db = require('../db/connection')
const format = require('pg-format')

function fetchCategories() {
const sql = `SELECT * FROM categories`
    return db.query(sql).then(({rows}) => {
        if(!rows) {
            return Promise.reject({status: 400, msg: "Invalid query input"})
        } else {
            return rows
        }
})
}

function fetchReviews() {
    const sql = `SELECT reviews.review_id, reviews.title, reviews.designer, reviews.owner, reviews.review_img_url, reviews.category, reviews.created_at, reviews.votes FROM reviews JOIN comments ON reviews.review_id = comments.review_id;`
    return db.query(sql).then(({rows}) => {
        console.log(rows, "<-- rows")
        if (!rows) {
            return Promise.reject({status: 400, msg: "Invalid query input"})
        } else {
            return rows
        }
    })
}


module.exports = {fetchCategories, fetchReviews}