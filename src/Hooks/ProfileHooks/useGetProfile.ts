import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { UserResponseDto } from '../../Types/types';
import { API_BASE_URL } from '../../api/api';
import { useNavigate } from "react-router-dom";

export const useGetProfile = () => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;
  const navigate = useNavigate();

  return useQuery<UserResponseDto, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/users/profile`;
      try {
        const response = await axios.get<UserResponseDto>(URL, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      } catch (error: any) {
        if(error.response.status === 401) {
          localStorage.removeItem('user')
          alert("Please log in again")
          navigate("/") 
        }
      }
      throw Error;
    }
  });
};