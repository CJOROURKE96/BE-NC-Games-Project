const db = require('../db/connection');
const format = require('pg-format');
const reviews = require('../db/data/test-data/reviews');

function fetchCategories() {
  const sql = `SELECT * FROM categories`;
  return db.query(sql).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({ status: 400, msg: 'Invalid query input' });
    } else {
      return rows;
    }
  });
}

function fetchReviews({category, sort_by = "created_at", order = "DESC"}) {
  const sortValues = ['title', 'designer', 'owner', 'review_img_url', 'review_body', 'category', 'created_at', 'votes']
  const orderValues = ['asc', 'desc']
  
  if (sortValues.includes(sort_by) && orderValues.includes(order.toLowerCase())) {
  let sql = `SELECT reviews.review_id, reviews.title, reviews.designer, reviews.owner, reviews.review_img_url, reviews.category, reviews.created_at, reviews.votes, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id ` 
  const queryValues = []
  if(category) {
  sql += `WHERE reviews.category = $1 `
  queryValues.push(category)
  }
  
  sql += `GROUP BY reviews.review_id ORDER BY reviews.${sort_by} ${order};`

  return db.query(sql, queryValues).then(({ rows }) => {
    return rows
  })
}
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
function fetchCommentsByReviewId(id) {
    const sql = `SELECT * FROM comments WHERE comments.review_id = $1 ORDER BY created_at DESC;`
    return db.query(sql, [id]).then(({rows}) => {
        return rows
        })
  }

function addCommentByReviewId(id, params) {
  const sql = `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *;`
  return db.query(sql, [params.body, params.username, id]).then(({rows}) => {
    return rows[0]
  })
  }
  
  
  function updateReview(id, votes) {
const sql = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`
 return db.query(sql, [votes, id]).then(({rows}) => {
  if (!rows.length) {
    return Promise.reject({status: 404, msg: "review not found"})
  } else {
  return rows[0]
  }
 })
}


function fetchUsers() {
  const sql = `SELECT * FROM users`;
  return db.query(sql).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({ status: 400, msg: 'Invalid query input' });
    } else {
      return rows;
    }
  });
}




module.exports = {fetchCategories, fetchReviews, fetchReviewsByReviewId, fetchCommentsByReviewId, addCommentByReviewId, updateReview, fetchUsers}


