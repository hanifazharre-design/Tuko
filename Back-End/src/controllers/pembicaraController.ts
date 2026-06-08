import type { Request, Response } from "express";
import type { Pembicara } from "../types/pembicara.js";
import { prisma } from "../lib/db.js";

export const getAllPembicara = async (req: Request, res: Response): Promise<void> => {
  const data = await prisma.pembicara.findMany();
  res.json(data);
};

export const createPembicara = async (req: Request, res: Response): Promise<void> => {
  const { name, role, email, photo, bio, status } = req.body;

  if (!name || !role || !email || !bio || !status) {
    res.status(400).json({ message: "Semua field wajib diisi kecuali foto" });
    return;
  }

  const data = await prisma.pembicara.create({
    data: { name, role, email, photo, bio, status },
  });

  res.status(201).json(data);
};

export const getPembicaraById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  const data = await prisma.pembicara.findUnique({ where: { id } });

  if (!data) {
    res.status(404).json({ message: "Pembicara tidak ditemukan" });
    return;
  }
  res.json(data);
};

export const updatePembicaraById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { name, role, email, photo, bio, status } = req.body;

  const data = await prisma.pembicara.update({
    where: { id },
    data: { name, role, email, photo, bio, status },
  });

  res.json(data);
};

export const deletePembicaraById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  await prisma.pembicara.delete({ where: { id } });

  res.json({ message: `Pembicara dengan ID ${id} berhasil dihapus` });
};