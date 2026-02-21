// === MongoDB Replica Sets ===
// In professional architecture, we don't just have one database. We have a Primary and multiple Secondaries.
// 
// === Distributed Data ===
// 1. Replica Set: A group of MongoDB processes that maintain the same data set. If the Primary goes down, the Secondaries hold an election and choose a new Primary automatically (High Availability).
// 2. Read/Write Splitting: We send all POST, PUT, and DELETE requests to the Primary. We send all GET requests to the Secondaries.
// 3. Primary (Write): Handles the heavy lifting of data consistency.
// 4. Secondary (Read): Scales your app to handle millions of visitors by spreading the load.


// MICROLAB
// Configure your Mongoose connection to use a Read Preference. This tells your driver to prioritize reading from Secondaries to save the Primary for critical writes.
import mongoose from 'mongoose';

const connectDB = async () => {
    const connString = "mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl";

    try {
        await mongoose.connect(connString, {
            // 'secondaryPreferred' reads from secondaries to reduce Primary load
            readPreference: 'secondaryPreferred',
        });
        console.log("Connected to Replica Set with Read-Splitting enabled");
    } catch (err) {
        console.log("Connection failed", err);
    }
}