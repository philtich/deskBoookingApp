import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { BookingResponseDto } from "../../Types/types";
import { useGetProfile } from "../ProfileHooks/useGetProfile";

export const useGetBookingList = (userId: string | undefined) => {
  const { data } = useGetProfile();
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;

  return useQuery<BookingResponseDto, Error>({
    queryKey: ["userBookings", userId],
    queryFn: async () => {
      const userId = data?.id;
      const URL = `${API_BASE_URL}/bookings/user/${userId}`;
      
      try {
        const response = await axios.get(URL, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user bookings.");
      }
    },
  });
};