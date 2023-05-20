const jwt = require("jsonwebtoken");
const studentAuth = require("../middleware/studentAuth"); // adjust the path to your actual file

describe("studentAuth", () => {
    it("should pass request to next middleware if authorization token is valid", () => {
        const mockReq = {
            headers: {
                authorization: jwt.sign({ id: '1', email: 'test@example.com', role: 'student' }, 'marinairPopaj') // adjust the 'secret' to your actual secret
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();

        studentAuth(mockReq, mockRes, mockNext);

        expect(mockReq._id).toBe('1');
        expect(mockReq.email).toBe('test@example.com');
        expect(mockReq.role).toBe('student');
        expect(mockNext).toBeCalled();
    });

    it("should respond with 401 if authorization token is not provided", () => {
        const mockReq = {
            headers: {}
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();

        studentAuth(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(401);
        expect(mockRes.json).toBeCalledWith("You are not authenticated!");
        expect(mockNext).not.toBeCalled();
    });

    it("should respond with 401 if authorization token does not belong to a student", () => {
        const mockReq = {
            headers: {
                authorization: jwt.sign({ id: '1', email: 'test@example.com', role: 'admin' }, 'marinairPopaj') // adjust the 'secret' to your actual secret
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();

        studentAuth(mockReq, mockRes, mockNext);

        expect(mockRes.status).toBeCalledWith(401);
        expect(mockRes.json).toBeCalledWith("You are not a student!");
        expect(mockNext).not.toBeCalled();
    });
});
