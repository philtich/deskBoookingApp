import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { UserResponseDto } from "../../Types/types";

export const useGetAllUsers = (searchTerm?: string) => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  
  return useQuery({
    queryKey: ["allUsers", searchTerm],
    queryFn: async () => {
      const URL = `${API_BASE_URL}/users`;
      try {
        const response = await axios.get<UserResponseDto>(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const sortedData = response.data.sort(
          (a: UserResponseDto, b: UserResponseDto) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const filteredData = response.data.filter(
          (user: { firstname: string; }) =>
            !searchTerm ||
            user.firstname.toLowerCase().includes(searchTerm.trim())
        );

        return filteredData;
      } catch (error) {
        throw new Error("Failed to fetch all users.");
      }
    },
  });
};