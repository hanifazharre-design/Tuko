import prisma from "../lib/Prisma.js";
export const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        return res.status(200).json(events);
    }
    catch (error) {
        console.error("GET EVENTS ERROR:", error);
        return res.status(500).json({
            message: "Gagal mengambil data events",
            error,
        });
    }
};
export const createEvent = async (req, res) => {
    try {
        const { title, categoryId, pembicaraId, location, dateEvent, description } = req.body;
        if (!title ||
            !categoryId ||
            !pembicaraId ||
            !location ||
            !dateEvent ||
            !description) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }
        const newEvent = await prisma.event.create({
            data: {
                title,
                location,
                dateEvent: new Date(dateEvent),
                description,
                category: {
                    connect: {
                        id: Number(categoryId),
                    },
                },
                pembicara: {
                    connect: {
                        id: Number(pembicaraId),
                    },
                },
            },
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};
export const getEventById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                pembicara: true,
            },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error("GET EVENT BY ID ERROR:", error);
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }
};
export const UpdateEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, categoryId, pembicaraId, location, dateEvent, description, } = req.body;
        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                location,
                dateEvent: new Date(dateEvent),
                description,
                category: {
                    connect: {
                        id: Number(categoryId),
                    },
                },
                pembicara: {
                    connect: {
                        id: Number(pembicaraId),
                    },
                },
            },
        });
        res.status(200).json(event);
    }
    catch (error) {
        console.error("UPDATE EVENT ERROR:", error);
        res.status(500).json({
            message: "Event gagal diupdate",
            error,
        });
    }
};
export const deleteEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.event.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Event berhasil dihapus",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Event gagal dihapus",
            error,
        });
    }
};
//# sourceMappingURL=EventControllers.js.map