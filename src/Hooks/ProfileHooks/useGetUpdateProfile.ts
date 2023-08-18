import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetProfile } from './useGetProfile';
import { API_BASE_URL } from '../../api/api';
import { SignUpProps } from '../../Types/types';
  
export const useGetUpdateProfile = () => {
  const { data } = useGetProfile();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: SignUpProps) => {
      const token = JSON.parse(localStorage.getItem('user')!)
      const authToken = token.token;
      const userId = data?.id;
      const URL = `${API_BASE_URL}/users/${userId}`;

      const bodyParams = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        department: formData.department,
        password: formData.password,
      };

      const response = await axios.put(URL, bodyParams, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      return response.data as SignUpProps;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();

    },

    onError: (error) => {
      console.error('Error updating profile:', error);
      throw error;
    }
  });
};







export default useGetUpdateProfile;
