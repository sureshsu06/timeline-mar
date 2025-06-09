import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample companies
  const apple = await prisma.company.create({
    data: {
      name: 'Apple Inc.',
      domain: 'apple.com',
      foundedDate: new Date('1976-04-01'),
      industry: 'Technology'
    }
  });

  const google = await prisma.company.create({
    data: {
      name: 'Google',
      domain: 'google.com',
      foundedDate: new Date('1998-09-04'),
      industry: 'Technology'
    }
  });

  const netflix = await prisma.company.create({
    data: {
      name: 'Netflix',
      domain: 'netflix.com',
      foundedDate: new Date('1997-08-29'),
      industry: 'Entertainment'
    }
  });

  // Create sample snapshots for Apple
  const appleSnapshot1 = await prisma.snapshot.create({
    data: {
      companyId: apple.id,
      snapshotDate: new Date('2000-03-15'),
      waybackUrl: 'https://web.archive.org/web/20000315000000*/apple.com',
      screenshotUrl: 'https://example.com/screenshots/apple-2000.png',
      thumbnailUrl: 'https://example.com/thumbnails/apple-2000.png',
      isMajorChange: true
    }
  });

  const appleSnapshot2 = await prisma.snapshot.create({
    data: {
      companyId: apple.id,
      snapshotDate: new Date('2007-01-09'),
      waybackUrl: 'https://web.archive.org/web/20070109000000*/apple.com',
      screenshotUrl: 'https://example.com/screenshots/apple-2007.png',
      thumbnailUrl: 'https://example.com/thumbnails/apple-2007.png',
      isMajorChange: true
    }
  });

  // Create sample milestones
  await prisma.milestone.create({
    data: {
      companyId: apple.id,
      milestoneDate: new Date('2007-01-09'),
      type: 'product',
      title: 'iPhone Launch',
      description: 'Steve Jobs announces the first iPhone at Macworld',
      metrics: {
        employees: 21600,
        revenue: 24000000000
      }
    }
  });

  await prisma.milestone.create({
    data: {
      companyId: google.id,
      milestoneDate: new Date('2004-08-19'),
      type: 'funding',
      title: 'IPO',
      description: 'Google goes public with IPO',
      metrics: {
        employees: 3000,
        marketCap: 23000000000
      }
    }
  });

  // Create sample sources
  await prisma.source.create({
    data: {
      snapshotId: appleSnapshot2.id,
      type: 'news',
      title: 'Apple Introduces iPhone',
      url: 'https://www.apple.com/newsroom/2007/01/09Apple-Introduces-iPhone/',
      publisher: 'Apple Newsroom',
      publishDate: new Date('2007-01-09'),
      excerpt: 'Apple today introduced iPhone, combining three products...'
    }
  });

  // Create sample commentary
  await prisma.commentary.create({
    data: {
      snapshotId: appleSnapshot2.id,
      commentaryText: 'This redesign coincided with the iPhone launch, showing Apple\'s shift toward mobile-first thinking.',
      designNotes: 'Clean, minimalist design with prominent iPhone imagery. Heavy use of white space.',
      businessContext: 'Major pivot moment for Apple, moving from computer company to mobile device leader.',
      tags: JSON.stringify(['iphone', 'mobile', 'redesign', 'minimalist'])
    }
  });

  // Create sample design analysis
  await prisma.designAnalysis.create({
    data: {
      snapshotId: appleSnapshot2.id,
      primaryColors: JSON.stringify(['#000000', '#FFFFFF', '#007AFF']),
      fonts: JSON.stringify(['Helvetica Neue', 'Arial']),
      layoutType: 'grid',
      hasMobileVersion: false,
      pageWeightKb: 125
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });