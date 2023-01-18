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

function fetchReviewsByReviewId(id) {
    return db.query(`SELECT reviews.review_id, reviews.title, reviews.review_body, reviews.designer, reviews.review_img_url, reviews.votes, reviews.category, reviews.owner, reviews.created_at FROM reviews WHERE reviews.review_id = $1;`, [id]).then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: "review_id does not exist"})
        } else {
        return rows[0]
        }
    })
}



module.exports = {fetchCategories, fetchReviews, fetchReviewsByReviewId}