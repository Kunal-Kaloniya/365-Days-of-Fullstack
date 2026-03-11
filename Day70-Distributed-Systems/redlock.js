// === Distributed Locking (Redlock) ===
// In a distributed environment (multiple Node.js instances), a local variable or a simple JS mutex won't work.
// You need a global lock that all servers respect.
// 
// === The "Lease" Pattern ===
// 
// 1. The Race Condition: Imagine two servers process a "Withdraw ₹1000" request for the same user simultaneously. If they both check the balance at the same time, they might both approve it, even if the user only has ₹1000.
// 
// 2. Distributed Lock: Before any sensitive operation, a server must "acquire" a lock in Redis with a specific key (e.g., lock:user:123).
// 
// 3. TTL (Safety): Every lock must have a Time-to-Live. If the server crashes while holding the lock, Redis will automatically release it after 10 seconds so the system doesn't stay stuck forever.
// 
// 4. Redlock Algorithm: A robust way to manage locks across multiple Redis nodes to ensure high availability.


// MICROLAB
// Implement a "Safe Withdrawal" function using the redlock library to ensure data integrity during concurrent transactions.
import Client from 'ioredis';
import Redlock from 'redlock';

const redis = new Client();
const redlock = new Redlock([redis], { retryCount: 10, retryDelay: 200 });

export const safeWithdraw = async (userId, amount) => {
    // 1. Acquire a lock for 5 seconds
    let lock = await redlock.acquire([`locks:account:${userId}`], 5000);

    try {
        // 2. Perform sensitive DB operations
        const user = await User.findById(userId);
        if (user.balance >= amount) {
            user.balance -= amount;
            await user.save();
            console.log("✅ Withdrawal successful");
        }
    } finally {
        // 3. Always release the lock, even if the code fails
        await lock.release();
    }
};