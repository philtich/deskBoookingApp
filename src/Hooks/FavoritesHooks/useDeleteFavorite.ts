import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";

export const useDeleteFavorite = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;

  return useMutation({
    mutationFn: async (Id: string) => {
      const URL = `${API_BASE_URL}/favourites/${Id}`;

      try {
        const response = await axios.delete(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        return response.data;
      } catch (error) {
        throw new Error("Failed to delete favorite.");
      }
    },
  });
};