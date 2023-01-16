const request = require('supertest')
const db = require('../db/connection')
const app = require('../app/app')

const seed = require('../db/seeds/seed')
const categoryData = require('../db/data/test-data/categories')
const commentData = require('../db/data/test-data/comments')
const reviewData = require('../db/data/test-data/reviews')
const userData = require('../db/data/test-data/users')


beforeEach(() => {
    return seed({categoryData, commentData, reviewData, userData })
})

afterAll(() => {
    db.end()
})

describe('App', () => {
    describe('GET /api/categories', () => {
        it('should when passed an array of objects, return that array of objects', () => {
            return request(app)
            .get('/api/categories')
            .expect(200)
            .then(({body}) => {
                body.forEach((category) => {
                    expect(category).toHaveProperty('slug', expect.any(String))
                    expect(category).toHaveProperty('description', expect.any(String))
                })
            })
         });
         it('should return a 404 error when accessing the wrong URL', () => {
             return request(app)
             .get('/api/categories/abcd')
             .expect(404)
         });
    });
    describe('GET /api/reviews', () => {
        it('should return an array of objects sorted into descending order, with a count of how many comments have the same review_id', () => {
            return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(({body}) => {

            })
        });
    });
});