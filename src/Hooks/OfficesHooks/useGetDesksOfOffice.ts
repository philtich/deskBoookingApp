import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { OfficeDeskProps } from '../../Types/types';

export const useGetDesksOfOffice = (id: string) => {
  const queryClient = useQueryClient();
  const officeId = id;

  return useMutation({
    mutationFn: async () => {
      const token = JSON.parse(localStorage.getItem('user')!)
      const authToken = token.token;
      const URL = `${API_BASE_URL}/offices/${officeId}`;

      const response = await axios.get<OfficeDeskProps>(URL, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
     
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export default useGetDesksOfOffice;