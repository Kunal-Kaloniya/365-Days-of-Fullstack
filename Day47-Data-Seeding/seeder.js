// === Data Seeding with Faker.js ===
// In a "Full-Fledged" MERN app, you need a way to reset your environment to a known state.
// Seeding is the process of putting initial data into a database.
// 
// === Deterministic Mocking ===
// 1. Faker.js: A library that generates realistic fake data (names, emails, addresses, credit card numbers).
// 2. The Seed Script: A standalone Node.js script that connects to your MongoDB, clears existing collections, and injects thousands of generated documents.
// 3. Why? It helps you test Pagination, Search, and Performance without manually typing data for 5 hours.


// MICROLAB
// Create a seed.js script that generates 50 fake products with realistic prices and categories.
import { faker } from '@faker-js/faker';
import dbConnect from './lib/db';
import Product from './models/Product';

const seedDatabase = async () => {
    await dbConnect();

    // 1. Clear existing data
    await Product.deleteMany({});

    // 2. Generate 50 products
    const products = Array.from({ length: 50 }).map(() => ({
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 10, max: 1000 }),
        description: faker.commerce.productDescription(),
        category: faker.helpers.arrayElement(['Electronics', 'Fashion', 'Home']),
        stock: faker.number.int({ min: 0, max: 100 }),
    }));

    // 3. Insert in bulk (Better performance than a loop)
    await Product.insertMany(products);

    console.log("Database Seeded Successfully!");
    process.exit();
};

seedDatabase();