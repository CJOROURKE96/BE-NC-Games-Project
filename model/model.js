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
    const sql = `SELECT reviews.review_id, reviews.title, reviews.designer, reviews.owner, reviews.review_img_url, reviews.category, reviews.created_at, reviews.votes, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`
    return db.query(sql).then(({rows}) => {
        if (!rows) {
            return Promise.reject({status: 400, msg: "Invalid query input"})
        } else {
            return rows
        }
    })
}

function fetchCommentsByReviewId(id) {
    const sql = `SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at ;`
    return db.query(sql, [id]).then(({rows}) => {
        console.log(rows, "<-- MODEL")
        return rows
    })
}


module.exports = {fetchCategories, fetchReviews, fetchCommentsByReviewId}