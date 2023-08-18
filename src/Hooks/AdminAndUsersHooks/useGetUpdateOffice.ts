import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { UpdateOffice } from '../../Types/types';
import { useGetAllOffices } from '../OfficesHooks/useGetAllOffices';


export const useGetUpdateOffice = () => {
  const { data } = useGetAllOffices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( formData: UpdateOffice) => {
      try {
        const token = JSON.parse(localStorage.getItem('user')!);
        const authToken = token.token;
        const URL = `${API_BASE_URL}/admin/offices/${formData.id}`;
        
        const response = await axios.put(URL, formData, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      } catch (error) {
        throw new Error("Failed to update office.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error updating Office:', error);
      throw new Error("Failed to update office.");
    },
  });
};
