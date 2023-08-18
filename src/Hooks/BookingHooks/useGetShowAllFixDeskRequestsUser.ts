import axios from 'axios';
import {  useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../api/api';
import { FixDeskApprovalProps } from '../../Types/types';
import { useGetProfile } from '../ProfileHooks/useGetProfile';
  
export const UseGetShowAllFixDeskRequestsUser = () => {
    const { data } = useGetProfile();
    const userId = data?.id

  return useQuery<FixDeskApprovalProps[], Error>({
    queryKey: ["fixedDeskRequest", userId],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem('user')!)
      const authToken = token.token;
      
      const URL = `${API_BASE_URL}/fixdesk-requests/user/${userId}`;


      const response = await axios.get<FixDeskApprovalProps[]>(URL, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
      
      return response.data;
    },

   
  });
};