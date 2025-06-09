import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import companyRoutes from './routes/companies';
import snapshotRoutes from './routes/snapshots';
import timelineRoutes from './routes/timeline';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3001', 10);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/snapshots', snapshotRoutes);
app.use('/api/timeline', timelineRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    prisma.$disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    prisma.$disconnect();
    process.exit(0);
  });
});