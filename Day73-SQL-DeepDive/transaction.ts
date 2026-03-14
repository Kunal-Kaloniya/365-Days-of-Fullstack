// === Transactions & Joins ===
// In MongoDB, we often "Embed" data. In SQL, we "Normalize" it into separate tables and "Join" them back together.
// 
// === Data Atomicity ===
// 1. The "N+1" Problem: A common mistake where you fetch 10 posts, then run 10 separate queries to get the author of each. This kills performance. We solve this with Joins (fetching everything in one trip).
// 2. ACID Transactions: Atomicity: All-or-nothing.
//      a) Consistency: Moves the DB from one valid state to another.
//      b) Isolation: Concurrent transactions don't mess with each other.
//      c) Durability: Once committed, data stays saved even if the power goes out.


// MICROLAB
// Implement a "Checkout" transaction in Prisma. It must update the Product stock and create the Order simultaneously. If the stock update fails (e.g., out of stock), the order must never be created.

// A Prisma Transaction (Sequential)
const checkout = await prisma.$transation(async (tx) => {
    // 1. Decrement the stock
    const product = await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: 1 } };
    });

    // 2. Error Check: Can't have negative stock
    if (product.stock < 0) {
        throw new Error("Out of stock");    // This rolls back the entire transaction automatically
    }

    // 3. Create the order
    const order = await tx.order.create({
        data: { userId, productId, amount: product.price },
    });

    return order;
});