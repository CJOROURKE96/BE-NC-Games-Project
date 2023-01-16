const db = require('../db/connection')
const format = require('pg-format')

function fetchCategories() {
const sql = `SELECT * FROM categories`
    return db.query(sql).then(({rows}) => {
        console.log(rows)
        if(!rows) {
            return Promise.reject({status: 400, msg: "Invalid query input"})
        } else {
            return rows
        }
})
}


module.exports = {fetchCategories}