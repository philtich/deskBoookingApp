// useCreateOffice.ts
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { DeskCreateFormPropsMu } from "../../Types/types";

export const useGetCreateDesk = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DeskCreateFormPropsMu) => {
            const URL = `${API_BASE_URL}/admin/desks`;
            const bodyParams = {
                label: data.label,
                office: data.office,
                equipment: data.equipment,
            };

        try {
            const response = await axios.post(URL, bodyParams, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': `Bearer ${authToken}`,
                },
            });

        return response.data;
    
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create office');
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries("allDesks");
    },  
});
};