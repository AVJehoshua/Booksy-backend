// const supertest = require('supertest');
// const app = require('../app'); // Import your Express app
// const request = supertest(app);

// describe('GET /users/:user_id', () => {
//     it('should return a user for a valid user_id', async () => {
//         const userId = 'user_2dDnzvTQWr3Sas7EXZ19zIk8eSt'; // Use a valid user_id for testing
//         const response = await request.get(`/users/${userId}`);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('user_id', userId);
//         // Add more assertions as needed
//     });

//     it('should return 404 for an invalid user_id', async () => {
//         const response = await request.get('/users/nonexistent');
//         expect(response.status).toBe(404);
//     });
// });
