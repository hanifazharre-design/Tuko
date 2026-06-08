import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buyTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, eventId, paymentMethod } = req.body;

    if (!userId || !eventId || !paymentMethod) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Ambil harga event dari database
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    const orderId = `#INV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket = await prisma.ticket.create({
      data: {
        userId: parseInt(userId),
        eventId: parseInt(eventId),
        paymentMethod,
        price: event.price,
        orderId,
        status: "LUNAS",
      },
      include: {
        event: true,
        user: true,
      }
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error buying ticket:", error);
    res.status(500).json({ error: "Failed to buy ticket" });
  }
};

export const getUserTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: parseInt(userId as string) },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};
