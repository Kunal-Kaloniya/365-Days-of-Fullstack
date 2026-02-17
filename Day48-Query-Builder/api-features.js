// === The Query Builder Pattern ===
// When a user visits your "Store" page, they might want to:
// 1. Filter by Category: ?category=electronics
// 2. Filter by Price: ?price[gte]=500
// 3. Sort by Date: ?sort=-createdAt
// 4. Paginate: ?page=2&limit=10
// 
// === Query Object Manipulation ===
// Instead of passing req.query directly into .find(), which is a massive security risk, we create a pipeline to sanitize and format the query.
// 1. Filtering: Extract keys and handle MongoDB operators (converting gte to $gte).
// 2. Sorting: Transform strings like -price to Mongoose-friendly -price or { price: -1 }.
// 3. Field Limiting: Allow the client to request only specific fields to save bandwidth.
// 4. Pagination: Calculate skip and limit values based on the page number.


// MICROLAB
// Build a reusable Class that takes a Mongoose Query and the req.query object and returns the modified query.
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering: price[gte]=500 -> { price: { $gte: '500' } }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default sort
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default APIFeatures;