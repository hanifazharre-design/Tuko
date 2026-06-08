import prisma from "../lib/Prisma.js";
// GET ALL pembicara
export const getSpeakers = async (req, res) => {
    try {
        const pembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            success: true,
            data: pembicara,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pembicara",
            error,
        });
    }
};
// GET SPEAKER BY ID
export const getSpeakerById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const speaker = await prisma.pembicara.findUnique({
            where: {
                id,
            },
        });
        if (!speaker) {
            return res.status(404).json({
                success: false,
                message: "Speaker not found",
            });
        }
        res.status(200).json({
            success: true,
            data: speaker,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch speaker",
            error,
        });
    }
};
// CREATE SPEAKER
export const createSpeaker = async (req, res) => {
    try {
        const { name, role, image } = req.body;
        if (!name || !role || !image) {
            return res.status(400).json({
                success: false,
                message: "Name, role, dan image wajib diisi",
            });
        }
        const newSpeaker = await prisma.pembicara.create({
            data: {
                name,
                role,
                image,
            },
        });
        res.status(201).json({
            success: true,
            message: "Speaker created successfully",
            data: newSpeaker,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create speaker",
            error,
        });
    }
};
// UPDATE SPEAKER
export const updateSpeaker = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, role, image } = req.body;
        const updatedSpeaker = await prisma.pembicara.update({
            where: {
                id,
            },
            data: {
                name,
                role,
                image,
            },
        });
        res.status(200).json({
            success: true,
            message: "Speaker updated successfully",
            data: updatedSpeaker,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update speaker",
            error,
        });
    }
};
// DELETE SPEAKER
export const deleteSpeaker = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.pembicara.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            success: true,
            message: "Speaker deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete speaker",
            error,
        });
    }
};
//# sourceMappingURL=speakersControllers.js.map