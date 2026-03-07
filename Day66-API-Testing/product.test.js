// === Integration Testing ===
// Unlike "Unit Tests" (which test a single function), Integration Tests test the entire request/response cycle.
// You send a real HTTP request to your app and check the database for the results.
// 
// === The Test Database Lifecycle ===
// 1. Supertest: A library that allows you to "simulate" HTTP requests to your Express app without actually starting the server on a port.
// 
// 2. The Mock Database: You should never test on your production or local dev database. Use a dedicated Test DB (often an in-memory MongoDB) that is wiped clean before every test run.
// 
// 3. Setup & Teardown:
//     a) beforeAll: Connect to the Test DB.
//     b) beforeEach: Clear the collections.
//     c) afterAll: Close the connection.


// MICROLAB
// Write a test that ensures a user cannot create a product without a valid JWT token.
import request from 'supertest';
import app from '../app';
import { User } from '../models/userModel';

describe('POST /api/products', () => {
    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({ name: 'Test Product', price: 100 });

        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/please log in/i);
    });

    it('should create product if user is authenticated', async () => {
        const token = 'mock-valid-jwt-token'; // Simplified for example
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Real Product', price: 200 });

        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe('Real Product');
    });
});