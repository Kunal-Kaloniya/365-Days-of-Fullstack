// === Concurrency Control ===
// When two requests try to update the same row at the same time,
// you have a "Race Condition."
// 
// === Locking Strategies ===
// 1. Pessimistic Locking: "I'm taking this row, and nobody else can touch it until I'm done."
// 
//     a) How: Uses database-level locks (SELECT ... FOR UPDATE).
// 
//     b) Use Case: High-conflict scenarios where data integrity is more important than speed (e.g., Banking).
// 
// 2. Optimistic Locking: "I'll let everyone read/edit, but before I save, I'll check if someone else changed it while I was busy."
// 
//     a) How: Uses a version or timestamp column.
// 
//     b) Use Case: Low-conflict scenarios where you want high performance (e.g., Social Media, CMS).
// 
//     c) The Logic: UPDATE users SET balance = 50, version = 2 WHERE id = 1 AND version = 1. If the version is already 2, the update fails.


// MICROLAB
// Implement Optimistic Locking in a Mongoose (MongoDB) schema to prevent "Lost Updates" in a product inventory.
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    stock: Number,
    version: { type: Number, default: 0 } // Our version key
});

// Update logic with Optimistic Check
export const updateStock = async (productId: string, quantity: number) => {
    const product = await Product.findById(productId);

    // Attempt update only if version matches what we just read
    const result = await Product.updateOne(
        { _id: productId, version: product.version },
        {
            $inc: { stock: -quantity, version: 1 }
        }
    );

    if (result.modifiedCount === 0) {
        throw new Error("Conflict: Product was updated by another user.");
    }
};