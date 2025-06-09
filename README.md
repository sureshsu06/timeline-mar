# Website Evolution Timeline Platform

A web application that displays the historical evolution of company websites through an interactive timeline interface, showing design changes alongside company milestones, public sources, and editorial commentary.

## Features

### MVP Features Implemented
✅ **Interactive Timeline Viewer**
- Horizontal timeline with smooth scrubbing
- Website preview that updates as timeline moves
- Milestone markers on timeline
- Context panel with stats, sources, and commentary

✅ **Core Components**
- Timeline scrubber with drag functionality
- Website preview with smooth transitions
- Context panel with tabbed interface
- Company selector dropdown

✅ **Data Management**
- PostgreSQL database with Prisma ORM
- RESTful API endpoints
- Structured data models for companies, snapshots, milestones

## Tech Stack

- **Backend**: Node.js with Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Image Storage**: Ready for AWS S3 or Cloudinary integration

## Project Structure

```
timeline-mar/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   │   ├── companies.ts
│   │   │   ├── snapshots.ts
│   │   │   └── timeline.ts
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Sample data
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Timeline/   # Timeline components
│   │   │   ├── Preview/    # Website preview
│   │   │   ├── ContextPanel/ # Side panel
│   │   │   └── Common/     # Shared components
│   │   ├── store/          # Zustand state management
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main app component
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL database
- Git

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd timeline-mar

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Setup PostgreSQL database
createdb website_evolution

# Update database connection in backend/.env
# DATABASE_URL="postgresql://user:password@localhost:5432/website_evolution"

# Generate Prisma client and run migrations
cd backend
npx prisma generate
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 3. Environment Configuration

**Backend (.env)**:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/website_evolution"
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:3001
```

### 4. Run the Application

```bash
# Start backend server (Terminal 1)
cd backend
npm run dev

# Start frontend development server (Terminal 2)
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Companies
- `GET /api/companies` - List all companies
- `GET /api/companies/:id` - Get company details
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company

### Timeline Data
- `GET /api/timeline/:companyId` - Get timeline data for company
- `GET /api/timeline/:companyId/snapshots` - Get paginated snapshots

### Snapshots
- `GET /api/snapshots/:id` - Get specific snapshot
- `POST /api/snapshots` - Create snapshot
- `POST /api/snapshots/:id/sources` - Add source
- `POST /api/snapshots/:id/commentary` - Add commentary

## Database Schema

### Core Models
- **Companies**: Company information and metadata
- **Snapshots**: Website captures with dates and screenshots
- **Milestones**: Company milestones (funding, product launches, etc.)
- **Sources**: External references and news articles
- **Commentary**: Editorial analysis and context
- **DesignAnalysis**: Automated design metrics

## Component Architecture

### Timeline Components
- `TimelineContainer`: Main timeline orchestrator
- `TimelineScrubber`: Draggable timeline control
- `TimelineMarkers`: Milestone visualization

### Preview Components
- `WebsitePreview`: Main screenshot display
- `PreviewControls`: Zoom and fullscreen controls
- `TransitionEffect`: Smooth transition animations

### Context Panel Components
- `ContextPanel`: Tabbed information panel
- `CompanyStats`: Company metrics and milestones
- `SourcesList`: External references
- `Commentary`: Editorial analysis
- `DesignAnalysis`: Design metrics and trends

## Development Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed sample data
```

### Frontend
```bash
npm start           # Start development server
npm run build       # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## Sample Data

The application includes sample data for:
- **Apple Inc.** (apple.com) - Founded 1976, Technology industry
- **Google** (google.com) - Founded 1998, Technology industry  
- **Netflix** (netflix.com) - Founded 1997, Entertainment industry

Each company includes sample snapshots, milestones, sources, and commentary to demonstrate the platform's capabilities.

## Features in Detail

### Interactive Timeline
- Smooth scrubbing with mouse drag
- Keyboard navigation (arrow keys, spacebar)
- Auto-play with configurable speed
- Major change indicators
- Date range display

### Website Preview
- High-quality screenshot display
- Zoom controls (25% to 300%)
- Fullscreen mode
- Smooth transitions between snapshots
- Error handling for missing images

### Context Panel
- **Stats Tab**: Company metrics and milestone data
- **Sources Tab**: External references and links
- **Commentary Tab**: Editorial analysis and insights
- **Design Tab**: Automated design analysis

### State Management
- Zustand for efficient state management
- Preloading of adjacent images
- Error handling and loading states
- Optimistic updates

## Future Enhancements

### Phase 2 Features
- [ ] Admin interface for content management
- [ ] Wayback Machine integration
- [ ] Screenshot capture automation
- [ ] Batch data import tools

### Phase 3 Features  
- [ ] AI-powered design analysis
- [ ] Multi-company comparison view
- [ ] Public API for researchers
- [ ] Mobile app
- [ ] Browser extension

### Phase 4 Features
- [ ] Community annotations
- [ ] Advanced search and filtering
- [ ] Export capabilities
- [ ] Real-time collaboration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Wayback Machine for historical website data
- React and TypeScript communities
- Tailwind CSS for styling framework
- Framer Motion for animations