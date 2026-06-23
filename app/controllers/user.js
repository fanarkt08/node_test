import { prisma } from '../../app.js';

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { firstName, lastName, email, password }
        });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
};

export const login = (req, res) => {
    res.send('You are login');
};
