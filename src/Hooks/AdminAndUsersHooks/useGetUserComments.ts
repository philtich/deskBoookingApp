import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { CommentResponseDto } from "../../Types/types";

export const useGetUserComments = (userId: string, page: number) => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;

  return useQuery<CommentResponseDto[], Error>({
    queryKey: ["userComments", userId, page],
    queryFn: async () => {
      const apiPage = page - 1;
      const URL = `${API_BASE_URL}/comments/user/${userId}`;
      try {
        const response = await axios.get(URL, {
          params: { page: apiPage },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user comments.");
      }
    },
  });
};