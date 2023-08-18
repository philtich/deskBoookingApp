import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { CommentCreate } from "../../Types/types";

export const useGetCreateComment = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommentCreate) => {
      const URL = `${API_BASE_URL}/comments`;
      const bodyParams = {
        comment: data.comment,
        desk: data.desk,
      };

      try {
        const response = await axios.post(URL, bodyParams, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to create comment"
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};