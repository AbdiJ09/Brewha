import { getProfileUser } from "@/apiServices/profileApiServices";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useQuery } from "@tanstack/react-query";

export const useUserProfileQuery = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["userProfile", user?.uid],
    queryFn: () => getProfileUser(user as FirebaseAuthTypes.User),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
};
