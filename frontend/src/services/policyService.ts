import api from './api';

export const policyService = {
  createPolicy: async (type: 'daily' | 'weekly') => {
    const response = await api.post<any>('/policy/create', { type });
    return response;
  },
  getActivePolicy: async () => {
    const response = await api.get<any>('/policy/status');
    return response;
  },
  getPolicies: async () => {
    const response = await api.get<any>('/policy');
    return response;
  },
};
