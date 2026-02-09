// === Multi-Document Transactions ===
// In a "Full-Fledged" app, some operations are Atomic. Either everything happens, or nothing happens.
// 
// === ACID Compliance ===
// 1. A (Atomicity): If one part of the transaction fails, the entire thing rolls back.
// 2. C (Consistency): Data moves from one valid state to another.
// 3. I (Isolation): Transactions don't "see" each other's halfway-done work.
// 4. D (Durability): Once commited, the data is permanent.


// MICROLAB
// Implement a transaction where you update a User's balance and create an Invoice simultaneously.
// If the Invoice fails, the User's money is "refunded" automatically.

async function processOrder(userId, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Deduct Balance
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { balance: -amount } },
            { session, new: true }
        );

        if (user.balance < 0) throw new Error("Insufficient funds");

        // 2. Create Invoice
        await Invoice.create([{ userId, amount, status: 'paid' }], { session });

        // Commit both operations
        await session.commitTransaction();
        console.log("Transaction Successful");
    } catch (error) {
        // If anything fails, undo everything
        await session.abortTransaction();
        console.error("Transaction Aborted: ", error.message);
    } finally {
        session.endSession();
    }
}