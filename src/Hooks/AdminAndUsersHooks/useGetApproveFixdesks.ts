import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FixDeskApprovalProps } from '../../Types/types';
import { API_BASE_URL } from '../../api/api';
import { useNavigate } from "react-router-dom";


export const useGetApproveFixdesks = (id: string, statusRequest: string) => {
  const token = JSON.parse(localStorage.getItem('user')!);
  const authToken = token.token;
  const navigate = useNavigate();
  const queryClient = useQueryClient();



  return useMutation<FixDeskApprovalProps, Error>({
    mutationFn: async () => {
      const URL = `${API_BASE_URL}/admin/fix-desk-requests`;
      const bodyParams = {
        id: id,
        status: statusRequest
      };
      
        const response = await axios.put<FixDeskApprovalProps>(URL, bodyParams, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/dashboard")
    },
});
};