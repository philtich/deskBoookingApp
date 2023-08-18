import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useGetDeleteComments = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentsId: string) => {
      const URL = `${API_BASE_URL}/admin/comments/${commentsId}`;

      try {
        const response = await axios.delete(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to delete Comment.");
      }
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};