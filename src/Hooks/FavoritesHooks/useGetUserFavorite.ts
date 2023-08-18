import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { FavouriteResponseCreateDto } from "../../Types/types";

export const useGetUserFavorite = (userId: string) => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;

  return useQuery<FavouriteResponseCreateDto, Error>({
    queryKey: ["userFavorites", userId],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/favourites/user/${userId}`;
      
      try {
        const response = await axios.get(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user favorites.");
      }
    },
  });
};