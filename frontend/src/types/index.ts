export interface Company {
  id: string;
  name: string;
  domain: string;
  foundedDate?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    snapshots: number;
    milestones: number;
  };
}

export interface Snapshot {
  id: string;
  companyId: string;
  snapshotDate: string;
  waybackUrl?: string;
  screenshotUrl?: string;
  thumbnailUrl?: string;
  isMajorChange: boolean;
  createdAt: string;
  company?: Company;
  sources?: Source[];
  commentary?: Commentary[];
  designAnalysis?: DesignAnalysis[];
}

export interface Milestone {
  id: string;
  companyId: string;
  milestoneDate: string;
  type: 'funding' | 'product' | 'team' | 'acquisition';
  title: string;
  description?: string;
  metrics?: Record<string, any>;
  createdAt: string;
  company?: Company;
}

export interface Source {
  id: string;
  snapshotId: string;
  type: 'news' | 'filing' | 'blog' | 'social';
  title: string;
  url: string;
  publisher?: string;
  publishDate?: string;
  excerpt?: string;
  createdAt: string;
}

export interface Commentary {
  id: string;
  snapshotId: string;
  commentaryText?: string;
  designNotes?: string;
  businessContext?: string;
  tags: string; // JSON string array
  createdAt: string;
  updatedAt: string;
}

export interface DesignAnalysis {
  id: string;
  snapshotId: string;
  primaryColors: string; // JSON string array
  fonts: string; // JSON string array
  layoutType?: string;
  hasMobileVersion?: boolean;
  pageWeightKb?: number;
  createdAt: string;
}

export interface TimelineData {
  timeline: Array<{
    type: 'snapshot' | 'milestone';
    date: string;
    data: Snapshot | Milestone;
  }>;
  snapshots: Snapshot[];
  milestones: Milestone[];
  totalSnapshots: number;
  totalMilestones: number;
}

export interface TimelineState {
  currentIndex: number;
  isPlaying: boolean;
  playSpeed: number;
  selectedSnapshot?: Snapshot;
  selectedMilestone?: Milestone;
}