import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DeskProps } from '../../Types/types';
import { API_BASE_URL } from '../../api/api';

export const useGetDesks = () => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useQuery<DeskProps, Error>({
    queryKey: ["allDesks"],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/desks`;
      try {
        const response = await axios.get<DeskProps>(URL, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const sortedData = response.data.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return sortedData;
      } catch (error) {
        throw new Error("Failed to fetch offices.");
      }
    }
  });
};