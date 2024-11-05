import axios from "@/lib/axios";
import { AxiosError } from "axios";

interface CheckEmailResponse {
  emailExists: boolean;
  providers: string[];
}

interface CreateUserData {
  name: string | null;
  email: string | null;
  firebaseUid: string;
}

// Perbaiki fungsi checkEmail
const checkEmail = async (email: string, idToken: string | null) => {
  try {
    const response = await axios.post<CheckEmailResponse>(
      "/users/check-email",
      { email },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ checkEmail ~ error:", error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) return { emailExists: false, providers: [] };
      else if (error.response?.status === 401) throw new Error("Unauthorized access. Please log in.");
    }
    throw new Error("An unexpected error occurred while checking the email.");
  }
};

const createUser = async (data: CreateUserData) => {
  try {
    const response = await axios.post("/users/add", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user. Please try again.");
  }
};

export { checkEmail, createUser };
