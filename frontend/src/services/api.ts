import axios from 'axios';
import { Company, TimelineData, Snapshot } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

export const companyApi = {
  // Get all companies
  getAll: async (): Promise<Company[]> => {
    const response = await api.get('/companies');
    return response.data;
  },

  // Get company by ID
  getById: async (id: string): Promise<Company> => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  // Create company (admin)
  create: async (company: Partial<Company>): Promise<Company> => {
    const response = await api.post('/companies', company);
    return response.data;
  },

  // Update company (admin)
  update: async (id: string, company: Partial<Company>): Promise<Company> => {
    const response = await api.put(`/companies/${id}`, company);
    return response.data;
  },
};

export const timelineApi = {
  // Get timeline data for company
  getTimeline: async (
    companyId: string,
    options?: {
      startDate?: string;
      endDate?: string;
      limit?: number;
    }
  ): Promise<TimelineData> => {
    const params = new URLSearchParams();
    if (options?.startDate) params.append('startDate', options.startDate);
    if (options?.endDate) params.append('endDate', options.endDate);
    if (options?.limit) params.append('limit', options.limit.toString());

    const response = await api.get(`/timeline/${companyId}?${params.toString()}`);
    return response.data;
  },

  // Get paginated snapshots
  getSnapshots: async (
    companyId: string,
    options?: {
      page?: number;
      limit?: number;
      majorChangesOnly?: boolean;
      startDate?: string;
      endDate?: string;
    }
  ) => {
    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.majorChangesOnly) params.append('majorChangesOnly', 'true');
    if (options?.startDate) params.append('startDate', options.startDate);
    if (options?.endDate) params.append('endDate', options.endDate);

    const response = await api.get(`/timeline/${companyId}/snapshots?${params.toString()}`);
    return response.data;
  },
};

export const snapshotApi = {
  // Get snapshot with all related data
  getById: async (id: string): Promise<Snapshot> => {
    const response = await api.get(`/snapshots/${id}`);
    return response.data;
  },

  // Create snapshot (admin)
  create: async (snapshot: Partial<Snapshot>): Promise<Snapshot> => {
    const response = await api.post('/snapshots', snapshot);
    return response.data;
  },
};