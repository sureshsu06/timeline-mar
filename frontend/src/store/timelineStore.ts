import { create } from 'zustand';
import { Company, Snapshot, Milestone, TimelineData } from '../types';

interface TimelineStore {
  // Data
  companies: Company[];
  selectedCompany: Company | null;
  timelineData: TimelineData | null;
  snapshots: Snapshot[];
  
  // UI State
  currentIndex: number;
  isPlaying: boolean;
  playSpeed: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCompanies: (companies: Company[]) => void;
  setSelectedCompany: (company: Company | null) => void;
  setTimelineData: (data: TimelineData | null) => void;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaySpeed: (speed: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed getters
  getCurrentSnapshot: () => Snapshot | null;
  getCurrentMilestone: () => Milestone | null;
  getSnapshotAtIndex: (index: number) => Snapshot | null;
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  // Initial state
  companies: [],
  selectedCompany: null,
  timelineData: null,
  snapshots: [],
  currentIndex: 0,
  isPlaying: false,
  playSpeed: 1,
  isLoading: false,
  error: null,
  
  // Actions
  setCompanies: (companies) => set({ companies }),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setTimelineData: (data) => {
    set({ 
      timelineData: data,
      snapshots: data?.snapshots || [],
      currentIndex: 0
    });
  },
  setCurrentIndex: (index) => set((state) => ({ 
    currentIndex: typeof index === 'function' ? index(state.currentIndex) : index 
  })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setPlaySpeed: (speed) => set({ playSpeed: speed }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  // Computed getters
  getCurrentSnapshot: () => {
    const { snapshots, currentIndex } = get();
    return snapshots[currentIndex] || null;
  },
  
  getCurrentMilestone: () => {
    const { timelineData, snapshots, currentIndex } = get();
    if (!timelineData || !snapshots.length) return null;
    
    const currentSnapshot = snapshots[currentIndex];
    if (!currentSnapshot) return null;
    
    // Find milestone closest to current snapshot date
    const snapshotDate = new Date(currentSnapshot.snapshotDate);
    const closestMilestone = timelineData.milestones
      .filter(m => new Date(m.milestoneDate) <= snapshotDate)
      .sort((a, b) => new Date(b.milestoneDate).getTime() - new Date(a.milestoneDate).getTime())[0];
      
    return closestMilestone || null;
  },
  
  getSnapshotAtIndex: (index: number) => {
    const { snapshots } = get();
    return snapshots[index] || null;
  },
}));