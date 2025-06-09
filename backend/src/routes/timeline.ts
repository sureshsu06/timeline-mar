import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/timeline/:companyId - Get all timeline data for company
router.get('/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const { startDate, endDate, limit = '50' } = req.query;

    // Build filters
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate as string);
    if (endDate) dateFilter.lte = new Date(endDate as string);

    // Get snapshots with timeline data
    const snapshots = await prisma.snapshot.findMany({
      where: {
        companyId,
        ...(Object.keys(dateFilter).length > 0 && {
          snapshotDate: dateFilter
        })
      },
      include: {
        sources: {
          take: 3,
          orderBy: { publishDate: 'desc' }
        },
        commentary: true,
        designAnalysis: true
      },
      orderBy: { snapshotDate: 'asc' },
      take: parseInt(limit as string)
    });

    // Get milestones for the same period
    const milestones = await prisma.milestone.findMany({
      where: {
        companyId,
        ...(Object.keys(dateFilter).length > 0 && {
          milestoneDate: dateFilter
        })
      },
      orderBy: { milestoneDate: 'asc' }
    });

    // Combine and sort by date
    const timelineData = [
      ...snapshots.map(s => ({
        type: 'snapshot' as const,
        date: s.snapshotDate,
        data: s
      })),
      ...milestones.map(m => ({
        type: 'milestone' as const,
        date: m.milestoneDate,
        data: m
      }))
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    res.json({
      timeline: timelineData,
      snapshots,
      milestones,
      totalSnapshots: snapshots.length,
      totalMilestones: milestones.length
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ error: 'Failed to fetch timeline data' });
  }
});

// GET /api/timeline/:companyId/snapshots - Get paginated snapshots
router.get('/:companyId/snapshots', async (req, res) => {
  try {
    const { companyId } = req.params;
    const { 
      page = '1', 
      limit = '20', 
      majorChangesOnly = 'false',
      startDate,
      endDate 
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const where: any = { companyId };
    
    if (majorChangesOnly === 'true') {
      where.isMajorChange = true;
    }

    if (startDate || endDate) {
      where.snapshotDate = {};
      if (startDate) where.snapshotDate.gte = new Date(startDate as string);
      if (endDate) where.snapshotDate.lte = new Date(endDate as string);
    }

    const [snapshots, total] = await Promise.all([
      prisma.snapshot.findMany({
        where,
        include: {
          sources: {
            take: 2,
            orderBy: { publishDate: 'desc' }
          },
          commentary: true
        },
        orderBy: { snapshotDate: 'asc' },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.snapshot.count({ where })
    ]);

    res.json({
      snapshots,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Error fetching snapshots:', error);
    res.status(500).json({ error: 'Failed to fetch snapshots' });
  }
});

export default router;