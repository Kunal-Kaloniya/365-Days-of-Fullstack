/**
 * 
 * === Unit & Integration Testing ===
 * 
 * Most developers hate testing because they try to test everything at once.
 * We will follow the Testing Pyramid approach: focus heavily on individual functions (Unit) and API endpoints (Integration).
 * 
 * === Red-Green-Refactor ===
 * This is the core of Test-Driven Development (TDD):
 * 1. Red: Write a test that fails (because the feature isn't built yet).
 * 2. Green: Write the bare minimum code to make the test pass.
 * 3. Refactor: Clean up the code while ensuring the test stays green.
 * 
 */


// MICROLAB
// Set up Jest to test a utility function and Supertest to test a Next.js/Express API route without actually running the server.
const request = require('supertest');
const app = require('../app'); // Your Express/Next app

describe('POST /api/orders', () => {
  it('should return 400 if product ID is missing', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ quantity: 5 });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Product ID required');
  });

  it('should create an order successfully with valid data', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ productId: '123', quantity: 1 });
    
    expect(res.statusCode).toEqual(201);
  });
});