import axios from "axios";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useGetAdminDelete = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const URL = `${API_BASE_URL}/admin/users/${userId}`;
      const response = await axios.delete(URL, {
        headers: {
          'Accept': "application/json",
          'Authorization': `Bearer ${authToken}`,
        },
      });

    return response.data;  
    },
    
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries("allUsers");
    },
  });
};