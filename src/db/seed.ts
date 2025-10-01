import { ticketRepository } from '../repositories/ticketRepository.js';
import { Ticket } from '../types/ticket.js';
import { initializeDatabase } from './database.js';

// Seed data (same as original mock data)
const seedTickets: Ticket[] = [
  {
    id: '1',
    title: 'Fix login page bug',
    description: 'Users unable to login with special characters in password',
    status: 'open',
    priority: 'high',
    createdAt: '2025-09-15T10:00:00Z',
    updatedAt: '2025-09-15T10:00:00Z',
    assignee: 'john.doe@example.com'
  },
  {
    id: '2',
    title: 'Update documentation',
    description: 'Add API documentation for new endpoints',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-16T09:30:00Z',
    updatedAt: '2025-09-20T14:20:00Z',
    assignee: 'jane.smith@example.com'
  },
  {
    id: '3',
    title: 'Performance optimization',
    description: 'Improve database query performance on user table',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-09-17T11:15:00Z',
    updatedAt: '2025-09-17T11:15:00Z'
  },
  {
    id: '4',
    title: 'Add user profile feature',
    description: 'Implement user profile page with avatar upload',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-18T08:45:00Z',
    updatedAt: '2025-09-18T08:45:00Z',
    assignee: 'bob.johnson@example.com'
  },
  {
    id: '5',
    title: 'Fix responsive design issues',
    description: 'Mobile layout breaks on screens smaller than 375px',
    status: 'closed',
    priority: 'medium',
    createdAt: '2025-09-10T13:00:00Z',
    updatedAt: '2025-09-14T16:30:00Z',
    assignee: 'alice.williams@example.com'
  },
  {
    id: '6',
    title: 'Implement dark mode',
    description: 'Add dark mode theme option to the application',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2025-09-19T10:20:00Z',
    updatedAt: '2025-09-22T11:45:00Z',
    assignee: 'charlie.brown@example.com'
  },
  {
    id: '7',
    title: 'Security audit',
    description: 'Conduct security audit on authentication system',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-09-21T07:00:00Z',
    updatedAt: '2025-09-21T07:00:00Z'
  },
  {
    id: '8',
    title: 'Add email notifications',
    description: 'Send email notifications when ticket status changes',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-09-22T12:30:00Z',
    updatedAt: '2025-09-22T12:30:00Z',
    assignee: 'david.jones@example.com'
  },
  {
    id: '9',
    title: 'Upgrade dependencies',
    description: 'Update all npm packages to latest versions',
    status: 'closed',
    priority: 'low',
    createdAt: '2025-09-05T09:00:00Z',
    updatedAt: '2025-09-08T17:00:00Z',
    assignee: 'eve.davis@example.com'
  },
  {
    id: '10',
    title: 'Implement search functionality',
    description: 'Add search bar to filter tickets by title and description',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2025-09-23T14:15:00Z',
    updatedAt: '2025-09-25T10:30:00Z',
    assignee: 'frank.miller@example.com'
  },
  {
    id: '11',
    title: 'Fix memory leak',
    description: 'Memory leak in websocket connection handling',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-09-24T16:00:00Z',
    updatedAt: '2025-09-24T16:00:00Z',
    assignee: 'grace.wilson@example.com'
  },
  {
    id: '12',
    title: 'Add export feature',
    description: 'Allow users to export tickets to CSV format',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-25T11:00:00Z',
    updatedAt: '2025-09-25T11:00:00Z'
  },
  {
    id: '13',
    title: 'Improve error handling',
    description: 'Add better error messages and logging',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-26T09:30:00Z',
    updatedAt: '2025-09-28T13:15:00Z',
    assignee: 'henry.moore@example.com'
  },
  {
    id: '14',
    title: 'Add analytics dashboard',
    description: 'Create dashboard to visualize ticket metrics',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-27T10:45:00Z',
    updatedAt: '2025-09-27T10:45:00Z'
  },
  {
    id: '15',
    title: 'Fix API rate limiting',
    description: 'Rate limiter not working correctly for authenticated users',
    status: 'open',
    priority: 'high',
    createdAt: '2025-09-28T15:20:00Z',
    updatedAt: '2025-09-28T15:20:00Z',
    assignee: 'isabel.taylor@example.com'
  },
  {
    id: '16',
    title: 'Integrate payment gateway',
    description: 'Add Stripe payment integration for subscription billing',
    status: 'in-progress',
    priority: 'urgent',
    createdAt: '2025-09-29T08:00:00Z',
    updatedAt: '2025-09-30T16:00:00Z',
    assignee: 'john.doe@example.com'
  },
  {
    id: '17',
    title: 'Add unit tests for auth module',
    description: 'Increase test coverage for authentication and authorization',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-09-29T10:15:00Z',
    updatedAt: '2025-09-29T10:15:00Z',
    assignee: 'jane.smith@example.com'
  },
  {
    id: '18',
    title: 'Optimize image loading',
    description: 'Implement lazy loading and WebP format for images',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-29T13:30:00Z',
    updatedAt: '2025-09-29T13:30:00Z'
  },
  {
    id: '19',
    title: 'Fix CORS issues on staging',
    description: 'Frontend unable to make API calls on staging environment',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-09-29T14:45:00Z',
    updatedAt: '2025-09-29T14:45:00Z',
    assignee: 'bob.johnson@example.com'
  },
  {
    id: '20',
    title: 'Add internationalization support',
    description: 'Implement i18n for multiple language support',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-29T16:00:00Z',
    updatedAt: '2025-09-29T16:00:00Z',
    assignee: 'alice.williams@example.com'
  },
  {
    id: '21',
    title: 'Database backup automation',
    description: 'Set up automated daily database backups to S3',
    status: 'closed',
    priority: 'high',
    createdAt: '2025-09-20T09:00:00Z',
    updatedAt: '2025-09-25T17:00:00Z',
    assignee: 'charlie.brown@example.com'
  },
  {
    id: '22',
    title: 'Implement caching layer',
    description: 'Add Redis caching for frequently accessed data',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-29T11:00:00Z',
    updatedAt: '2025-09-30T10:30:00Z',
    assignee: 'david.jones@example.com'
  },
  {
    id: '23',
    title: 'Fix broken links in footer',
    description: 'Several footer links return 404 errors',
    status: 'open',
    priority: 'low',
    createdAt: '2025-09-30T08:15:00Z',
    updatedAt: '2025-09-30T08:15:00Z',
    assignee: 'eve.davis@example.com'
  },
  {
    id: '24',
    title: 'Add two-factor authentication',
    description: 'Implement 2FA using TOTP for enhanced security',
    status: 'open',
    priority: 'high',
    createdAt: '2025-09-30T09:30:00Z',
    updatedAt: '2025-09-30T09:30:00Z',
    assignee: 'frank.miller@example.com'
  },
  {
    id: '25',
    title: 'Improve error messages',
    description: 'Make error messages more user-friendly and actionable',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-30T10:45:00Z',
    updatedAt: '2025-10-01T09:00:00Z',
    assignee: 'grace.wilson@example.com'
  },
  {
    id: '26',
    title: 'Add admin dashboard',
    description: 'Create admin panel for user and content management',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-09-30T12:00:00Z',
    updatedAt: '2025-09-30T12:00:00Z',
    assignee: 'henry.moore@example.com'
  },
  {
    id: '27',
    title: 'Fix mobile navigation',
    description: 'Hamburger menu not working on iOS devices',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-09-30T13:15:00Z',
    updatedAt: '2025-09-30T13:15:00Z',
    assignee: 'isabel.taylor@example.com'
  },
  {
    id: '28',
    title: 'Implement file upload',
    description: 'Allow users to upload profile pictures and documents',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-09-30T14:30:00Z',
    updatedAt: '2025-09-30T14:30:00Z',
    assignee: 'john.doe@example.com'
  },
  {
    id: '29',
    title: 'Add social media login',
    description: 'Enable login via Google, Facebook, and GitHub',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2025-09-30T15:45:00Z',
    updatedAt: '2025-10-01T10:00:00Z',
    assignee: 'jane.smith@example.com'
  },
  {
    id: '30',
    title: 'Fix timezone issues',
    description: 'Dates displaying incorrectly for users in different timezones',
    status: 'open',
    priority: 'high',
    createdAt: '2025-09-30T17:00:00Z',
    updatedAt: '2025-09-30T17:00:00Z',
    assignee: 'bob.johnson@example.com'
  },
  {
    id: '31',
    title: 'Implement webhook system',
    description: 'Add webhook support for third-party integrations',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T08:00:00Z',
    updatedAt: '2025-10-01T08:00:00Z'
  },
  {
    id: '32',
    title: 'Add activity logging',
    description: 'Track user actions for audit and analytics purposes',
    status: 'closed',
    priority: 'medium',
    createdAt: '2025-09-15T09:00:00Z',
    updatedAt: '2025-09-22T16:00:00Z',
    assignee: 'alice.williams@example.com'
  },
  {
    id: '33',
    title: 'Optimize database queries',
    description: 'Several queries are causing performance bottlenecks',
    status: 'in-progress',
    priority: 'urgent',
    createdAt: '2025-10-01T09:15:00Z',
    updatedAt: '2025-10-01T11:30:00Z',
    assignee: 'charlie.brown@example.com'
  },
  {
    id: '34',
    title: 'Add password reset flow',
    description: 'Users cannot reset forgotten passwords',
    status: 'open',
    priority: 'high',
    createdAt: '2025-10-01T10:30:00Z',
    updatedAt: '2025-10-01T10:30:00Z',
    assignee: 'david.jones@example.com'
  },
  {
    id: '35',
    title: 'Implement data export',
    description: 'Allow users to export their data in JSON and CSV formats',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T11:45:00Z',
    updatedAt: '2025-10-01T11:45:00Z',
    assignee: 'eve.davis@example.com'
  },
  {
    id: '36',
    title: 'Fix SSL certificate warning',
    description: 'Browser showing SSL certificate mismatch on production',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-10-01T12:00:00Z',
    updatedAt: '2025-10-01T12:00:00Z',
    assignee: 'frank.miller@example.com'
  },
  {
    id: '37',
    title: 'Add keyboard shortcuts',
    description: 'Implement keyboard navigation for power users',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T13:15:00Z',
    updatedAt: '2025-10-01T13:15:00Z',
    assignee: 'grace.wilson@example.com'
  },
  {
    id: '38',
    title: 'Improve accessibility',
    description: 'Make application WCAG 2.1 AA compliant',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-25T10:00:00Z',
    updatedAt: '2025-09-30T15:00:00Z',
    assignee: 'henry.moore@example.com'
  },
  {
    id: '39',
    title: 'Add bulk actions',
    description: 'Enable bulk edit, delete, and export for tickets',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-10-01T14:30:00Z',
    updatedAt: '2025-10-01T14:30:00Z',
    assignee: 'isabel.taylor@example.com'
  },
  {
    id: '40',
    title: 'Fix memory leak in WebSocket',
    description: 'Server memory usage increases over time due to WebSocket connections',
    status: 'open',
    priority: 'urgent',
    createdAt: '2025-10-01T15:45:00Z',
    updatedAt: '2025-10-01T15:45:00Z',
    assignee: 'john.doe@example.com'
  },
  {
    id: '41',
    title: 'Implement comment system',
    description: 'Add commenting functionality to tickets',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-10-01T16:00:00Z',
    updatedAt: '2025-10-01T16:00:00Z',
    assignee: 'jane.smith@example.com'
  },
  {
    id: '42',
    title: 'Add notification preferences',
    description: 'Let users customize their notification settings',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2025-09-28T11:00:00Z',
    updatedAt: '2025-10-01T09:30:00Z',
    assignee: 'bob.johnson@example.com'
  },
  {
    id: '43',
    title: 'Create API documentation',
    description: 'Generate comprehensive API docs with examples',
    status: 'open',
    priority: 'high',
    createdAt: '2025-10-01T17:15:00Z',
    updatedAt: '2025-10-01T17:15:00Z',
    assignee: 'alice.williams@example.com'
  },
  {
    id: '44',
    title: 'Add real-time collaboration',
    description: 'Enable multiple users to edit tickets simultaneously',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T18:30:00Z',
    updatedAt: '2025-10-01T18:30:00Z'
  },
  {
    id: '45',
    title: 'Fix email delivery issues',
    description: 'Some notification emails are not being delivered',
    status: 'open',
    priority: 'high',
    createdAt: '2025-10-01T19:45:00Z',
    updatedAt: '2025-10-01T19:45:00Z',
    assignee: 'charlie.brown@example.com'
  },
  {
    id: '46',
    title: 'Implement version control',
    description: 'Track changes and allow reverting to previous versions',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-10-01T20:00:00Z',
    updatedAt: '2025-10-01T20:00:00Z',
    assignee: 'david.jones@example.com'
  },
  {
    id: '47',
    title: 'Add custom fields',
    description: 'Allow users to create custom fields for tickets',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-09-27T14:00:00Z',
    updatedAt: '2025-10-01T16:30:00Z',
    assignee: 'eve.davis@example.com'
  },
  {
    id: '48',
    title: 'Fix chart rendering',
    description: 'Dashboard charts not displaying correctly on Safari',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T21:15:00Z',
    updatedAt: '2025-10-01T21:15:00Z',
    assignee: 'frank.miller@example.com'
  },
  {
    id: '49',
    title: 'Implement API versioning',
    description: 'Add proper API versioning strategy',
    status: 'closed',
    priority: 'medium',
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2025-09-12T14:00:00Z',
    assignee: 'grace.wilson@example.com'
  },
  {
    id: '50',
    title: 'Add ticket templates',
    description: 'Create reusable templates for common ticket types',
    status: 'open',
    priority: 'low',
    createdAt: '2025-10-01T22:30:00Z',
    updatedAt: '2025-10-01T22:30:00Z',
    assignee: 'henry.moore@example.com'
  }
];

/**
 * Seed the database with initial ticket data
 */
export function seedDatabase() {
  // Check if database already has data
  const existingTickets = ticketRepository.findAll();

  if (existingTickets.length > 0) {
    console.log('⏭️  Database already seeded, skipping...');
    return;
  }

  console.log('🌱 Seeding database...');

  for (const ticket of seedTickets) {
    ticketRepository.create(ticket);
  }

  console.log(`✅ Seeded ${seedTickets.length} tickets`);
}

// Allow running this script directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
  seedDatabase();
  console.log('✅ Database seeding complete!');
  process.exit(0);
}

