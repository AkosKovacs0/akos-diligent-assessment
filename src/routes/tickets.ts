import { Router, Request, Response } from "express";
import { ticketRepository } from "../repositories/ticketRepository.js";
import { Ticket } from "../types/ticket.js";
import { PaginatedResponse } from "../types/pagination.js";

const router = Router();

/**
 * GET /api/v1/tickets
 * Query parameters:
 * ???
 * - status: Filter by status (optional)
 * - priority: Filter by priority (optional)
 */
router.get("/", (req: Request, res: Response) => {
  try {
    // Parse pagination parameters
    // TODO

    // Parse filters
    // TODO

    // Get paginated tickets from database
    const tickets = ticketRepository.findAll(/* params */);
    const total = ticketRepository.count(/* params */);
    const totalPages = 0; // TODO: Fix this

    const response: PaginatedResponse<Ticket> = {
      /* TODO: Build response */
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/v1/tickets/:id
 * Get a single ticket by ID
 */
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = ticketRepository.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
