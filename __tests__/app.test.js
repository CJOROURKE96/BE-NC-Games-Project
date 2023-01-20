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
                expect(body.reviews.length).toBe(13)
                body.reviews.forEach((review) => {
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
                    expect(body.reviews).toBeSortedBy("created_at", {descending: true})
                })
        });
    });

    describe('GET /api/reviews/:review_id', () => {
        it('should return a review object by review id', () => {
            return request(app)
            .get('/api/reviews/1')
            .then(({body}) => {
                expect(body).toEqual({review: {
                    review_id: 1,
                    title: 'Agricola',
                    review_body: 'Farmyard fun!',
                    designer: 'Uwe Rosenberg',
                    review_img_url: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
                    votes: 1,
                    category: 'euro game',
                    owner: 'mallionaire',
                    created_at: '2021-01-18T10:00:20.514Z'
                  }
                })
                expect(body.review.review_id).toBe(1)
            })
        });
        it('should return a 404 error when passing a review_id that does not exist ', () => {
            return request(app)
            .get('/api/reviews/1000')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("review_id does not exist")
            })
            
        });
        it('should return a 400 because it is invalid', () => {
            return request(app)
            .get('/api/reviews/abcd')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad Request")
            })
        })

    describe('GET /api/reviews/:review_id/comments', () => {
        it('should return an array of comments based on input review_id', () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then(({body: {comments}}) => {
                expect(comments.length).toBe(3)
                comments.forEach((comment) => {
                    expect(comment).toHaveProperty("comment_id", expect.any(Number))
                    expect(comment).toHaveProperty("body", expect.any(String))
                    expect(comment).toHaveProperty("review_id", expect.any(Number))
                    expect(comment).toHaveProperty("author", expect.any(String))
                    expect(comment).toHaveProperty("votes", expect.any(Number))
                    expect(comment).toHaveProperty("created_at", expect.any(String))
                })
            })
        });
        it('should return comments with the most recent displayed first ', () => {
            return request(app)
                .get('/api/reviews/2/comments')
                .expect(200)
                .then(({body}) => {
                    expect(body.comments).toBeSortedBy("created_at", {descending: true})
            })
        });
        it('should return 200 for a request to a blank comment array', () => {
            return request(app)
                .get('/api/reviews/1/comments')
                .expect(200)
                .then(({body}) => {
                    expect(body.comments).toEqual([])
             })
        });
        it('should return 404 if review_id is invalid', () => {
            return request(app)
                .get('/api/reviews/1000/comments')
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe('review_id does not exist')
                })

        });
    })
})
    // describe('PATCH /api/reviews/:review_id', () => {
    //     const input = {inc_votes: 1}
    //     it('should return an updated review with incremented votes ', () => {
    //         return request(app)
    //         .patch('/api/reviews/1')
    //         .send(input)
    //         .expect(201)

    //     });
    // });
})