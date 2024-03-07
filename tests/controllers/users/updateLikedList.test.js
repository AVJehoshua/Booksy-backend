const { updateUserLikedList } = require('../../../controllers/users');
const User = require('../../../models/user');


jest.mock('../../models/user', () => ({
    findOne: jest.fn()
}));

describe('updateUserLikedList when status = "like', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                bookId: 'someBookId',
                user_id: 'someUserId',
                status: 'like'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should update user liked list when user exists', async () => {
        const user = {
            saved_items: ['existingBookId']
        };
        User.findOne.mockResolvedValue(user);

        await updateUserLikedList(req, res);

        expect(user.saved_items).toEqual(expect.arrayContaining(['someBookId', 'existingBookId']));
    });

    it('should return the same list when same bookId is added', async () => {
        const user = {
            saved_items:['someBookId']
        }
        User.findOne.mockResolvedValue(user);

        await updateUserLikedList(req, res);

        expect(user.saved_items).toEqual(['someBookId']);

    });

    it('should return 404 when user does not exist', async () => {
        User.findOne.mockResolvedValue(null);

        await updateUserLikedList(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unable to find user by user_id' });
    });

    // Add more test cases as needed
});

describe('updateUserLikedList when status = "unlike', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                bookId: 'someBookId',
                user_id: 'someUserId',
                status: 'unlike'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should update user liked list when user exists', async () => {
        const user = {
            saved_items: ['existingBookId']
        };
        User.findOne.mockResolvedValue(user);

        await updateUserLikedList(req, res);

        expect(user.saved_items).toEqual(['existingBookId']);
    });

    it('should return the same list when same bookId is added', async () => {
        const user = {
            saved_items:['someBookId']
        }

        User.findOne.mockResolvedValue(user);

        await updateUserLikedList(req, res);

        expect(user.saved_items).toEqual([]);

    });

    it('should return 404 when user does not exist', async () => {
        User.findOne.mockResolvedValue(null);

        await updateUserLikedList(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unable to find user by user_id' });
    });

});