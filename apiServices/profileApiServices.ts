import axios from "@/lib/axios";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface ProfileUserResponse extends FirebaseAuthTypes.User {
  username: string;
  name: string;
}
export const getProfileUser = async (user: FirebaseAuthTypes.User): Promise<ProfileUserResponse> => {
  try {
    const response = await axios.get(`/users/profile`, {
      headers: {
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
