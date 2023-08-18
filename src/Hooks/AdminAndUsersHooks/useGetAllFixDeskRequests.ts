import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FixDeskApprovalProps } from '../../Types/types';
import { API_BASE_URL } from '../../api/api';

export const useGetAllFixDeskRequests = () => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;

  return useQuery<FixDeskApprovalProps, Error>({
    queryKey: ["fixDeskApprovals"],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/admin/fix-desk-requests`;
      try {
        const response = await axios.get<FixDeskApprovalProps>(URL, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
  
        return sortedData;
      } catch (error) {
        throw new Error("Failed to fetch offices.");
      }
    }

    })
}