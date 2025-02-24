import { useCallback } from 'react';
import api from '../api';
import { UserSet } from '../models/userModel';

export const useSearchUsers = (query: string, offset: number, limit: number, alphabetMode:boolean) => {
      const getSearchUsers = useCallback(async (): Promise<UserSet> => {
    try {
      
      const response = await api.get<UserSet>('/users/search-lazy', {
        params: { q: query, offset, limit, alphabet: alphabetMode },
      });
          
      return response.data;
      
    } catch (error) {
      console.error('Error fetching search users:', error);
      return { total: 0, data: [] };
    }
  }, [query, offset, limit, alphabetMode]);

  return { getSearchUsers };
};
