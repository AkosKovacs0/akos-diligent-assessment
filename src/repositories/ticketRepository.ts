import { db } from "../db/database.js";
import { Ticket, TicketStatus, TicketPriority } from "../types/ticket.js";

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface PaginationOptions {
  // TODO: Implement pagination options
}

export class TicketRepository {
  /**
   * Get all tickets with optional filtering and pagination
   */
  findAll(filters?: TicketFilters /* pagination params */): Ticket[] {
    // Handle filters and pagination parameters
    // Build the query
    // Execute the query
    // Return the result
    return [];
  }

  /**
   * Get a single ticket by ID
   */
  findById(id: string): Ticket | undefined {
    const stmt = db.prepare("SELECT * FROM tickets WHERE id = ?");
    return stmt.get(id) as Ticket | undefined;
  }

  /**
   * Create a new ticket
   */
  create(ticket: Ticket): Ticket {
    const stmt = db.prepare(`
      INSERT INTO tickets (id, title, description, status, priority, assignee, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.status,
      ticket.priority,
      ticket.assignee || null,
      ticket.createdAt,
      ticket.updatedAt
    );

    return ticket;
  }

  /**
   * Update an existing ticket
   */
  update(
    id: string,
    updates: Partial<Omit<Ticket, "id" | "createdAt">>
  ): Ticket | undefined {
    const existing = this.findById(id);
    if (!existing) {
      return undefined;
    }

    const updatedTicket = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const stmt = db.prepare(`
      UPDATE tickets
      SET title = ?, description = ?, status = ?, priority = ?, assignee = ?, updatedAt = ?
      WHERE id = ?
    `);

    stmt.run(
      updatedTicket.title,
      updatedTicket.description,
      updatedTicket.status,
      updatedTicket.priority,
      updatedTicket.assignee || null,
      updatedTicket.updatedAt,
      id
    );

    return updatedTicket;
  }

  /**
   * Delete a ticket
   */
  delete(id: string): boolean {
    const stmt = db.prepare("DELETE FROM tickets WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }

  /**
   * Get total count of tickets with optional filters
   */
  count(filters?: TicketFilters): number {
    let query = "SELECT COUNT(*) as count FROM tickets WHERE 1=1";
    const params: any[] = [];

    if (filters?.status) {
      query += " AND status = ?";
      params.push(filters.status);
    }

    if (filters?.priority) {
      query += " AND priority = ?";
      params.push(filters.priority);
    }

    const stmt = db.prepare(query);
    const result = stmt.get(...params) as { count: number };
    return result.count;
  }
}

export const ticketRepository = new TicketRepository();
