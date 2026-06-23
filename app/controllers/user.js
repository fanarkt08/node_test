import { prisma } from '../../app.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });

        res.status(201).send(user);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};

export const login = (req, res) => {
    res.send('You are login');
};