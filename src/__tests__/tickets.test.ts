import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';
import { seedDatabase } from '../db/seed.js';
import { apiUriFor } from '../utils.js';

describe('Tickets API', () => {
  const ticketsApiUri = apiUriFor('/tickets');
  const TOTAL_SEEDED_TICKETS = 50;

  // Seed database before all tests
  beforeAll(() => {
    seedDatabase();
  });

  describe('GET /api/v1/tickets', () => {
    it('should return paginated tickets with default parameters', async () => {
      const response = await request(app)
        .get(ticketsApiUri)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeLessThanOrEqual(10); // default limit
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });

    it('should return correct pagination metadata', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?page=1&limit=5`)
        .expect(200);

      expect(response.body.pagination).toMatchObject({
        page: 1,
        limit: 5,
        total: TOTAL_SEEDED_TICKETS,
        totalPages: Math.ceil(TOTAL_SEEDED_TICKETS / 5)
      });
      expect(response.body.pagination.hasNextPage).toBe(true);
      expect(response.body.pagination.hasPreviousPage).toBe(false);
    });

    it('should handle page parameter correctly', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?page=2&limit=5`)
        .expect(200);

      expect(response.body.pagination.page).toBe(2);
      expect(response.body.data.length).toBe(5);
      expect(response.body.pagination.hasPreviousPage).toBe(true);
    });

    it('should handle limit parameter correctly', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?limit=3`)
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(3);
      expect(response.body.pagination.limit).toBe(3);
    });

    it('should enforce maximum limit of 100', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?limit=200`)
        .expect(200);

      expect(response.body.pagination.limit).toBe(100);
    });

    it('should handle page out of range gracefully', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?page=999&limit=10`)
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(0);
      expect(response.body.pagination.hasNextPage).toBe(false);
    });

    it('should filter tickets by status', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?status=open`)
        .expect(200);

      expect(response.body.data.every((ticket: any) => ticket.status === 'open')).toBe(true);
    });

    it('should filter tickets by priority', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?priority=high`)
        .expect(200);

      expect(response.body.data.every((ticket: any) => ticket.priority === 'high')).toBe(true);
    });

    it('should handle combined filters', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?status=open&priority=urgent`)
        .expect(200);

      expect(response.body.data.every((ticket: any) =>
        ticket.status === 'open' && ticket.priority === 'urgent'
      )).toBe(true);
    });

    it('should return empty array for filters with no matches', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?status=nonexistent`)
        .expect(200);

      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.total).toBe(0);
    });

    it('should handle invalid page parameter', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?page=invalid`)
        .expect(200);

      // Should default to page 1
      expect(response.body.pagination.page).toBe(1);
    });

    it('should handle negative page number', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?page=-1`)
        .expect(200);

      // Should default to page 1
      expect(response.body.pagination.page).toBe(1);
    });

    it('should return correct ticket structure', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}?limit=1`)
        .expect(200);

      const ticket = response.body.data[0];
      expect(ticket).toHaveProperty('id');
      expect(ticket).toHaveProperty('title');
      expect(ticket).toHaveProperty('description');
      expect(ticket).toHaveProperty('status');
      expect(ticket).toHaveProperty('priority');
      expect(ticket).toHaveProperty('createdAt');
      expect(ticket).toHaveProperty('updatedAt');
    });
  });

  describe('GET /api/v1/tickets/:id', () => {
    it('should return a single ticket by ID', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}/1`)
        .expect(200);

      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
    });

    it('should return 404 for non-existent ticket', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}/999`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Ticket not found');
    });

    it('should return correct ticket data', async () => {
      const response = await request(app)
        .get(`${ticketsApiUri}/5`)
        .expect(200);

      expect(response.body.id).toBe('5');
      expect(response.body.status).toBe('closed');
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not found');
    });
  });
});

