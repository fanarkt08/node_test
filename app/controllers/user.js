import { prisma } from '../../app.js';

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { firstName, lastName, email, password }
        });
        res.status(201).send(user);
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || 'Internal server error' });
    }
};

export const login = (req, res) => {
    res.send('You are login');
};
