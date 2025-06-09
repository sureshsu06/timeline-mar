import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/companies - List all companies
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            snapshots: true,
            milestones: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// GET /api/companies/:id - Get company details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        snapshots: {
          orderBy: { snapshotDate: 'asc' },
          include: {
            sources: true,
            commentary: true,
            designAnalysis: true
          }
        },
        milestones: {
          orderBy: { milestoneDate: 'asc' }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// POST /api/companies - Create company
router.post('/', async (req, res) => {
  try {
    const { name, domain, foundedDate, industry } = req.body;
    
    const company = await prisma.company.create({
      data: {
        name,
        domain,
        foundedDate: foundedDate ? new Date(foundedDate) : null,
        industry
      }
    });

    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// PUT /api/companies/:id - Update company
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, domain, foundedDate, industry } = req.body;

    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        domain,
        foundedDate: foundedDate ? new Date(foundedDate) : null,
        industry
      }
    });

    res.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

export default router;