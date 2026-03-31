// === Distributed Transactions (Saga) ===
// When you have an "Order service" and a "Payment Service", you cannot use a single database transaction.
// If the payment fails but the order is already "Created" in another database, you have a data disaster.
// 
// === The Saga Pattern ===
// 1. The Problem: 2PC (Two-Phase Commit) is slow and creates a single point of failure in distributed systems.
// 
// 2. The Solution (Saga): A sequence of local transactions. Each service performs its own update and publishes an event.
// 
// 3. Choreography-Based Saga:
//      a) Order Service created an order in PENDING state and emits OrderCreated.
//      b) Payment Service hears OrderCreated, charges the user, and emits PaymentSuccessful.
//      c) Order Service hears PaymentSuccessful and moves order to COMPLETE.
// 
// 4. Compensating Transactions: If the Payment fails, the Payment Service emits PaymentFailed. The Order Service hears this executes a "Compensating" action to CANCEL the order.


// MICROLAB
// Conceptualize a "Revert" logic for a failed distributed transaction using an event-driven approach.

// Order Service Listener
eventEmitter.on('PAYMENT_FAILED', async (data) => {
    const { orderId, reason } = data;

    // The "Compensating Transaction"
    await Order.updateOne(
        { _id: orderId },
        {
            status: 'CANCELLED',
            cancelReason: reason,
            updatedAt: new Date()
        }
    );

    console.log(`Order ${orderId} reverted due to payment failure.`);
});