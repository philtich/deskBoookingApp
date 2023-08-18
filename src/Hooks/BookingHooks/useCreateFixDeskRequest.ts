import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export const useCreateFixDeskRequest = (id: string) => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useMutation({
    mutationFn: async () => {
      const URL = `${API_BASE_URL}/fixdesk-requests`;
      const bodyParams = {
        desk: id
      };

      const response = await axios.post(URL, bodyParams, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${authToken}`,
        },
      });

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
      alert('You successfully submitted your requirement to the Admin!')
      navigate('/');
    },
    
    onError: (error: Error) => {
      queryClient.invalidateQueries();      
      throw new Error("This table is already booked!");
    },
  });
};