import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/snapshots/:id - Get specific snapshot with all related data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await prisma.snapshot.findUnique({
      where: { id },
      include: {
        company: true,
        sources: {
          orderBy: { publishDate: 'desc' }
        },
        commentary: true,
        designAnalysis: true
      }
    });

    if (!snapshot) {
      return res.status(404).json({ error: 'Snapshot not found' });
    }

    res.json(snapshot);
  } catch (error) {
    console.error('Error fetching snapshot:', error);
    res.status(500).json({ error: 'Failed to fetch snapshot' });
  }
});

// POST /api/snapshots - Create snapshot
router.post('/', async (req, res) => {
  try {
    const {
      companyId,
      snapshotDate,
      waybackUrl,
      screenshotUrl,
      thumbnailUrl,
      isMajorChange
    } = req.body;

    const snapshot = await prisma.snapshot.create({
      data: {
        companyId,
        snapshotDate: new Date(snapshotDate),
        waybackUrl,
        screenshotUrl,
        thumbnailUrl,
        isMajorChange: isMajorChange || false
      },
      include: {
        company: true
      }
    });

    res.status(201).json(snapshot);
  } catch (error) {
    console.error('Error creating snapshot:', error);
    res.status(500).json({ error: 'Failed to create snapshot' });
  }
});

// POST /api/snapshots/:id/sources - Add source to snapshot
router.post('/:id/sources', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, url, publisher, publishDate, excerpt } = req.body;

    const source = await prisma.source.create({
      data: {
        snapshotId: id,
        type,
        title,
        url,
        publisher,
        publishDate: publishDate ? new Date(publishDate) : null,
        excerpt
      }
    });

    res.status(201).json(source);
  } catch (error) {
    console.error('Error creating source:', error);
    res.status(500).json({ error: 'Failed to create source' });
  }
});

// POST /api/snapshots/:id/commentary - Add commentary to snapshot
router.post('/:id/commentary', async (req, res) => {
  try {
    const { id } = req.params;
    const { commentaryText, designNotes, businessContext, tags } = req.body;

    const commentary = await prisma.commentary.create({
      data: {
        snapshotId: id,
        commentaryText,
        designNotes,
        businessContext,
        tags: tags || []
      }
    });

    res.status(201).json(commentary);
  } catch (error) {
    console.error('Error creating commentary:', error);
    res.status(500).json({ error: 'Failed to create commentary' });
  }
});

// PUT /api/snapshots/:id/commentary/:commentaryId - Update commentary
router.put('/:id/commentary/:commentaryId', async (req, res) => {
  try {
    const { commentaryId } = req.params;
    const { commentaryText, designNotes, businessContext, tags } = req.body;

    const commentary = await prisma.commentary.update({
      where: { id: commentaryId },
      data: {
        commentaryText,
        designNotes,
        businessContext,
        tags: tags || []
      }
    });

    res.json(commentary);
  } catch (error) {
    console.error('Error updating commentary:', error);
    res.status(500).json({ error: 'Failed to update commentary' });
  }
});

export default router;