const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
    let server;
    
    beforeAll(() => {
        server = app.listen(4000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return the welcome message', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Jenkins CI/CD pipeline completed successfully.');
    });
});
