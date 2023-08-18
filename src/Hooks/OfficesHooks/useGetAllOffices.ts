import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { OfficeProps } from '../../Types/types';
import { API_BASE_URL } from '../../api/api';

export const useGetAllOffices = () => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useQuery<OfficeProps, Error>({
    queryKey: ["offices"],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/offices`;
      try {
        const response = await axios.get<OfficeProps>(URL, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch offices.");
      }
    }
  });
};