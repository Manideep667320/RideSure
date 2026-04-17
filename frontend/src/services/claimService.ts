import api from './api';

export const claimService = {
  submitClaim: async (data: any) => {
    const response = await api.post<any>('/claim/submit', data);
    return response;
  },
  getClaims: async () => {
    const response = await api.get<any>('/claim');
    return response;
  },
};
