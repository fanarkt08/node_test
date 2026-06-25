import { prisma } from '../../app.js';

const buildLinks = (wood, req) => {
    const base = `${req.protocol}://${req.get("host")}/api/woods`;
    return [
        { rel: "self", method: "GET", href: `${base}/${wood.id}` },
        { rel: "sameHardness", method: "GET", href: `${base}/${wood.hardness}` },
    ];
};

export const create = async (req, res) => {
    const data = req.body.datas ? JSON.parse(req.body.datas) : req.body;
    const pathname = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : null;

    try {
        const wood = await prisma.wood.create({
            data: {
                ...data,
                image: pathname,
            }
        });

        res.status(201).json({ ...wood, links: buildLinks(wood, req) });
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};

export const readAll = async (req, res) => {
    try {
        const woods = await prisma.wood.findMany();
        const woodsWithLinks = woods.map(wood => ({ ...wood, links: buildLinks(wood, req) }));
        res.json(woodsWithLinks);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};

export const readByHardness = async (req, res) => {
    const { hardness } = req.params;

    try {
        const woods = await prisma.wood.findMany({ where: { hardness } });
        const woodsWithLinks = woods.map(wood => ({ ...wood, links: buildLinks(wood, req) }));
        res.json(woodsWithLinks);
    } catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal server error'
        });
    }
};