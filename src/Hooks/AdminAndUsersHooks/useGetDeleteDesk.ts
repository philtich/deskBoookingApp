import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useGetDeleteDesk = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deskId: string) => {
      const URL = `${API_BASE_URL}/admin/desks/${deskId}`;
      try {
        const response = await axios.delete(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to delete desk.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};