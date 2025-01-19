const request = require('supertest');
const app = require('../server'); // Adjust the path according to your project structure

describe('Backend Server Endpoints', () => {
  test('GET /api/gps returns GPS data', async () => {
    const response = await request(app).get('/api/gps');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('speed');
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('direction');
  });

  test('GET /api/temperature returns temperature data', async () => {
    const response = await request(app).get('/api/temperature');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('internal');
    expect(response.body).toHaveProperty('external');
  });

  test('GET /api/battery returns battery status', async () => {
    const response = await request(app).get('/api/battery');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('percentage');
    expect(response.body).toHaveProperty('health');
  });

  test('GET /api/camera returns camera feed status', async () => {
    const response = await request(app).get('/api/camera');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('feed');
  });

  test('GET /api/lidar returns LiDAR data', async () => {
    const response = await request(app).get('/api/lidar');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('points');
  });

  test('GET /api/accelerometer returns accelerometer data', async () => {
    const response = await request(app).get('/api/accelerometer');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('x');
    expect(response.body).toHaveProperty('y');
    expect(response.body).toHaveProperty('z');
  });
});