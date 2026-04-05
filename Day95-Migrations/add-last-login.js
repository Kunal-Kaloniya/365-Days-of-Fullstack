// === Zero-Downtime Migrations ===
// Changing a database schema in production is like changing the tires on a car while it's driving at 100 km/h.
// 
// === The Migration Pipeline ===
// 1. The Version Table: Every database should have a schema_migrations table that tracks which "Version" the database is currently on.
// 
// 2. The "Up" and "Down" Pattern: * Up: The script to apply a change (e.g., ADD COLUMN phone_number).
//     (a) Down: The "Emergency Brake" to undo the change (e.g., DROP COLUMN phone_number).
// 
// 3. The "Three-Phase" Deploy (The Gold Standard):
//     (a) Expand: Add the new column/table, but keep the old code running.
//     (b) Migrate: Copy data from the old structure to the new one.
//     (c) Contract: Once the new code is stable, delete the old column/table.
// 
// 4. Tools: Knex.js (SQL), Mongoose-Migrate (MongoDB), or Prisma Migrations.


// === MICROLAB ===
// Create a migration script that adds a lastLogin field to a User collection with a default value, ensuring existing users are updated.
// Using a generic migration pattern
export const up = async (db) => {
    console.log("Upgrading: Adding lastLogin field...");

    // 1. Add the field to all existing users
    await db.collection('users').updateMany(
        { lastLogin: { $exists: false } },
        { $set: { lastLogin: new Date() } }
    );
};

export const down = async (db) => {
    console.log("Downgrading: Removing lastLogin field...");

    // 1. Revert the change
    await db.collection('users').updateMany(
        {},
        { $unset: { lastLogin: "" } }
    );
};