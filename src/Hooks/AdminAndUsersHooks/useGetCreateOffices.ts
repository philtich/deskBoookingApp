// useCreateOffice.ts
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { CreateOfficeProps } from "../../Types/types";

export const useGetCreateOffices = () => {
  const token = JSON.parse(localStorage.getItem("user")!);
  const authToken = token.token;
  const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateOfficeProps) => {
            const URL = `${API_BASE_URL}/admin/offices`;
            const bodyParams = {
                name: data.name,
                columns: data.columns,
                rows: data.rows,
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
        queryClient.invalidateQueries("allOffices");
    },  
});
};




