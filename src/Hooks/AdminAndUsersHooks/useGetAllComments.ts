import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { CommentResponseDto } from "../../Types/types";

export const useGetAllComments = (page: number) => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;

  return useQuery<CommentResponseDto[], Error>({
    queryKey: ["userComments", page],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/comments`;
      const apiPage = page - 1;
      
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
        throw new Error("Failed to fetch users comments.");
      }
    },
  });
};