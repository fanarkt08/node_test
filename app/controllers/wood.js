import { prisma } from '../../app.js';

export const create = async (req, res) => {
    const data = JSON.parse(req.body.datas);
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    try {
        const wood = await prisma.wood.create({
            data: {
                ...data,
                image: pathname,
            }
        });

        res.status(201).json(wood);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};

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

export const readByHardness = async (req, res) => {
    const { hardness } = req.params;

    try {
        const woods = await prisma.wood.findMany({
            where: { hardness }
        });
        res.json(woods);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};
