import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { SignInProps } from '../../Types/types';
import { useNavigate } from "react-router-dom";

export const useGetSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (signin: SignInProps) => {
      const URL = `${API_BASE_URL}/users/login`;
      const bodyParams = {
        email: signin.email,
        password: signin.password
      };

      const response = await axios.post(URL, bodyParams, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',  
        },
      });
      
      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/dashboard")
    },
    
    onError: (error: any) => {
      queryClient.invalidateQueries();
      throw new Error(error.message);
    },
  });
};