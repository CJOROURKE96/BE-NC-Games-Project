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
        it('should when passed an array of category objects without a query, return that array of category objects', () => {
            return request(app)
            .get('/api/categories')
            .expect(200)
            .then(({body}) => {
                expect(body.length).toBe(4)
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
        it('should return an array of review objects, with an added key of comment_count populated with the count of review_ids within comments', () => {
            return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(({body}) => {
                expect(body.length).toBe(13)
                body.forEach((review) => {
                    expect(review).toHaveProperty('title', expect.any(String))
                    expect(review).toHaveProperty('designer', expect.any(String))
                    expect(review).toHaveProperty('review_id', expect.any(Number))
                    expect(review).toHaveProperty('owner', expect.any(String))
                    expect(review).toHaveProperty('review_img_url', expect.any(String))
                    expect(review).toHaveProperty('category', expect.any(String))
                    expect(review).toHaveProperty('created_at', expect.any(String))
                    expect(review).toHaveProperty('votes', expect.any(Number))
                    expect(review).toHaveProperty('comment_count', expect.any(Number)) 
                })
            })
        });
        it('should return the array of review objects in descending order based off the created_at key', () => {
                return request(app)
                .get('/api/reviews')
                .expect(200)
                .then(({body}) => {
                    expect(body).toBeSortedBy("created_at", {descending: true})
                })
        });
    });
    describe('GET /api/reviews/:review_id/comments', () => {
        it('should return an array of comments based on input review_id', () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then(({body}) => {
                console.log(body, "<-- BODY TEST")
                expect(body)
            })
        });
    });
});