import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useGetPromoteToAdmin = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const URL = `${API_BASE_URL}/admin/promote`;
      const response = await axios.put(
        URL,
        { id: userId, isAdmin: true },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};