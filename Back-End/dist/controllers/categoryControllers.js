import prisma from "../lib/Prisma.js";
export const getCategory = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                id: "asc",
            },
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category Wajib Diisi",
            });
        }
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("ERROR DETAIL:", error);
        res.status(500).json({
            message: "Internal Server Error",
            errorName: error.name,
            errorMessage: error.message,
            errorCode: error.code,
        });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category Tidak Ditemukan",
            });
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        const category = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        res.json(category);
    }
    catch (error) {
        res.status(500).json({
            message: "Category gagal diupdate",
            error,
        });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.category.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Category Berhasil Dihapus",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Category gagal dihapus",
            error,
        });
    }
};
//# sourceMappingURL=categoryControllers.js.map