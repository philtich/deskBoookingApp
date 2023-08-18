import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { BookingRequest } from '../../Types/types';

export const useAddNewBookings = () => {

  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useMutation({
    mutationFn: async (book: BookingRequest) => {
      const URL = `${API_BASE_URL}/bookings`;
      const bodyParams = {
        dateStart: book.dateStart,
        dateEnd: book.dateEnd,
        desk: book.desk
      };

      const response = await axios.post(URL, bodyParams, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
     
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    
    onError: (error: Error) => {
      queryClient.invalidateQueries();
      throw new Error("This table is already booked!");
    },
  });
};