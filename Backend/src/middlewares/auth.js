import jwt from "jsonwebtoken";

// Retrieve the secret key from an environment variable
const secretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "Jiya");

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

export default authMiddleware;
