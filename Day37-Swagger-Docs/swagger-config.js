/**
 * 
 * === API Documentation with Swagger ===
 * Most developers write a README.md that gets outdated the moment they change variable name.
 * Swagger allows you to generate live, interactive documentation directly from your code.
 * 
 * === The "Living" Contract ===
 * Swagger uses the OpenAPI Specification. It provides a UI where you can actually "Try it out" - sending real requests to your API from the browser to see the responses.
 * 1. Standardization: It defines exactly what headers, query params, and body objects an endpoint expects.
 * 2. Auto-generation: By using JSDoc comments or decorators, your documentation updates whenever your code does.
 * 
 */


// MICROLAB
// Integrate swagger-jsdoc and swagger-ui-express into your backend. Create a documentd route that specifies the input schema.

/**
 * @swagger
 * /api/users/{id}
 * get:
 * summary: Retrieve a specific user
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * decription: The User ID
 * responses:
 * 200:
 * description: A single user object
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 */
app.get('/api/users/:id', (req, res) => {
    // logic...
});