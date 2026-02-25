// === Instant Search with Meilisearch ===
// While MongoDB is great for storage, it isn't a dedicated search.
// Meilisearch is an open-source, lightning-fast search engine that lives alongside your database.
// 
// === The Sidecar Search Pattern ===
// 1. Syncing: When a product is created or updated is created in MongoDB, we send a copy of that data to Meilisearch.
// 2. Typo Tolerance: Meilisearch automatically handles "iphone" -> "iphone".
// 3. Search-as-you-type: Results are returned in <50ms, allowing the UI to update with every keystroke.
// 4. Ranking: You can define custom ranking rules (e.g., "Show 'In Stock' items first").


// MICROLAB
// Set up a Mongoose Middleware (Hook) that automatically syncs your Product model to Meilisearch whenever a document is saved.
import {Meilisearch} from 'meilisearch';

const client = new Meilisearch({host: 'http://localhost:7700', apiKey: 'masterKey'});
const index = client.index('products');

// Mongoose Schema Hook
productSchema.post('save', async function(doc) {
    await index.addDocuments([{
        id: doc._id,
        name: doc.name,
        description: doc.description,
        price: doc.price,
        category: doc.category
    }]);
});

// Frontend (React)
const handleSearch = async (query) => {
    const results = await index.search(query);
    setSearchResults(results.hits);
};