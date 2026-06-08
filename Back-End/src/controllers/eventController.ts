import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL EVENTS
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        category: true, 
        pembicara: true,
      }, 
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data event", error });
  }
};

// CREATE EVENT
export const createEvent = async (req: Request, res: Response) => {
  try {
    // Gunakan nama field yang sama dengan yang dikirim dari Frontend
    const { name, dateEvent, location, categoryId, pembicaraId, description } = req.body;
    
    // Ambil filename jika ada file yang diupload
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newEvent = await prisma.event.create({
      data: {
        name,
        dateEvent: new Date(dateEvent), // Pastikan ini 'dateEvent'
        location: location,             // Pastikan ini 'location'
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId),
        description,
        image,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah event", error });
  }
};

// GET BY ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: { 
        category: true,
        pembicara: true,
      },
    });
    if (!event) return res.status(404).json({ message: "Event tidak ditemukan" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail event", error });
  }
};

// UPDATE EVENT
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    // VARIABEL DISAMAKAN DENGAN FRONTEND
    const { name, dateEvent, location, categoryId, pembicaraId, description } = req.body;

    const updateData: any = {
      name,
      dateEvent: new Date(dateEvent),
      location: location,
      categoryId: Number(categoryId),
      pembicaraId: Number(pembicaraId),
      description,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error update:", error);
    res.status(500).json({ message: "Gagal update event", error });
  }
};

// DELETE EVENT
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus event", error });
  }
};