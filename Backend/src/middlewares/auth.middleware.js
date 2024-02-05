import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.Token; // Change 'req.cookie.Token' to 'req.cookies.Token'

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Please log in first"
        });
    }

    try {
        const payload = jwt.verify(token, "Aryan");
        req.payload = payload; // Change 'const user = req.payload;' to 'req.payload = payload;'
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
