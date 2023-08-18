import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useAddToFavorites = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deskId: string) => {
      const URL = `${API_BASE_URL}/favourites`;
      const bodyParams = {
        desk: deskId,
      };

      const response = await axios.post(URL, bodyParams, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};