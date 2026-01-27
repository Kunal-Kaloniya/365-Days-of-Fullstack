/**
 * 
 * === The Repository Pattern ===
 * In basic MERN apps, you call User.findOne() directly inside your controllers.
 * >> The Problem: If you ever decide to switch from MongoDB to PostgreSQL, or even change your schema, you have to rewrite every single controller.
 * >> The Solution: You create a Repository Layer. Your controller talks to the Repository, and the Repository talks to the Database.
 * 
 * === Separation of Concerns ===
 * 1. Controller: Handles the Request/Response (Status codes, JSON).
 * 2. Service: Handles Business Logic (Calculations, Emails).
 * 3. Repository: Handles the Database (CRUD operations).
 * 
 */


// MICROLAB
// Refractor a standard "Get User" flow into a Repository pattern. This makes your code unit-testable and modular.

// 1. The Repository (The only place that knows about Mongoose)
class UserRepository {
    async findById(id) {
        return await UserRepository.findById(id).select('-password');
    }
}

// 2. The Service (Business Logic)
class UserService {
    constructor(UserRepository) {
        this.userRepo = UserRepository;
    }
    async getUserProfile(id) {
        // You could add caching or logging logic here
        return await this.userRepo.findById(id);
    }
}

// 3. The Controller (Next.js API or Express)
export async function GET(req, {params}) {
    const repo = new UserRepository();
    const service = new UserService(repo);
    const user = await service.getUserProfile(params.id);
    
    return Response.json(user);
}