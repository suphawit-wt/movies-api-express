import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
    it('responds with "Hello world!"', (done) => {
        request(app).get('/')
            .expect(200)
            .expect({
                "message": "Hello world!"
            }, done);
    })
})