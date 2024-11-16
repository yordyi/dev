const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('should respond with 200', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
    });
}); 