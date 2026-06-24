import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
    try {
        const woods = await prisma.wood.findMany();
        res.json(woods);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};
