const supertest = require('supertest');
const app = require('../app'); // Import your Express app
const request = supertest(app);
const User = require("../models/user");

describe("User model", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('has a first name', () => {
        const user = new User({
            first_name: "Test user",
        });
        expect(user.first_name).toEqual("Test user");
    });

    it('has a last name', () => {
        const user = new User({
            last_name: "Test last name",
        });
        expect(user.last_name).toEqual("Test last name")
    });

    it('has an email address', () => {
        const user = new User({
            email: "Test email",
        });
        expect(user.email).toEqual("Test email")
    });

    it('has a user_id', () => {
        const user = new User({
            user_id: "Test user_id",
        });
        expect(user.user_id).toEqual("Test user_id")
    });

    it('has an address', () => {
        const user = new User({
            address: "Test address",
        });
        expect(user.address).toEqual('Test address')
    });

    it('has email preferences', () => {
        const user = new User({
            email_preferences: ["Test email preferences"],
        });
        expect(user.email_preferences).toEqual(['Test email preferences'])
    });

    it('has saved_items', () => {
        const user = new User({
            saved_items: ['Test saved items'],
        });
        expect(user.saved_items).toEqual(['Test saved items'])
    });
});

describe('GET /users/:user_id', () => {
    it('should return a user for a valid user_id', async () => {
        const userId = 'user_2dJaY8saCvmwPCaEbvIjIpMffZl'; // Use a valid user_id for testing
        const response = await request.get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user_id', userId);
        // Add more assertions as needed
    });

    it('should return 404 for an invalid user_id', async () => {
        const response = await request.get('/users/nonexistent');
        expect(response.status).toBe(404);
    });
});
