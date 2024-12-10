const request = require('supertest');
const app = require('../src/app');

let server;

beforeAll(() => {
  server = app.listen(0); // Use port 0 for random available port during testing
});

afterAll((done) => {
  server.close(done);
});

describe('Health Check', () => {
  it('should return 200 for health check endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'OK' });
  });
});
