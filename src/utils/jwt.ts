import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, email: string, role: string): string => {
    const payload = { userId, email, role };
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret!, { expiresIn: '1h' });
    return token;
};