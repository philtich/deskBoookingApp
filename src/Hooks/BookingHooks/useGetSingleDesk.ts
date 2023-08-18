import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { DeskResponseUserSpecificDto } from '../../Types/types';

export const useGetSingleDesk = (id: any) => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useQuery<DeskResponseUserSpecificDto, Error>({
    queryKey: ["SingleDesk"],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/desks/${id}`
      try {
        const response = await axios.get<DeskResponseUserSpecificDto>(URL, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch desk.");
      }
    }
  });
};