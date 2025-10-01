import express, { Application, Request, Response } from "express";
import cors from "cors";
import ticketsRouter from "./routes/tickets.js";
import { apiUriFor } from "./utils.js";
import { initializeDatabase } from "./db/database.js";
import { seedDatabase } from "./db/seed.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initializeDatabase();

// Seed database if needed (only in development)
if (process.env.NODE_ENV !== "test") {
  seedDatabase();
}

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
const ticketsApiUri = apiUriFor("/tickets");
app.use(ticketsApiUri, ticketsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Tickets API: http://localhost:${PORT}${ticketsApiUri}`);
  });
}

export { app };
