import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/api";
import { SignUpProps } from "../../Types/types";
import { useNavigate } from "react-router-dom";

export const useGetSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: SignUpProps) => {
      const URL = `${API_BASE_URL}/users/register`;
      const bodyParams = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        department: formData.department,
        password: formData.password,
      };
      
      try {
        const response = await axios.post(URL, bodyParams, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        return response;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new Error("A user with this email already exists.");
        }
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });
};