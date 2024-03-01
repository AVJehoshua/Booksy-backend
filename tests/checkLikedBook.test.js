const { checkLikedBook } = require('../controllers/users');
const User = require('./../models/user'); // Assuming you have a User model defined somewhere

jest.mock('./../models/user', () => ({
    findOne: jest.fn()
}));

describe('checkLikedBook', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                bookId: 'someBookId',
                user_id: 'someUserId'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return true if book is liked by user', async () => {
        const user = {
            saved_items: ['someBookId']
        };
        User.findOne.mockResolvedValue(user);

        await checkLikedBook(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ true: true, message: "Book is liked" });
    });

    it('should return 404 if user does not exist', async () => {
        User.findOne.mockResolvedValue(null);

        await checkLikedBook(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Unable to find user by user_id" });
    });

    it('should return false if book is not liked by user', async () => {
        const user = {
            saved_items: ['anotherBookId']
        };
        User.findOne.mockResolvedValue(user);

        await checkLikedBook(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ false: false, message: "Book is not liked" });
    });

    // Add more test cases as needed
});