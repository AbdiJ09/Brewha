import { SocialButton } from "@/components/auth/SocialButton";
import LoadingScreen from "@/components/LoadingScreen";
import { Divider } from "@/components/ui/Divider";
import { useAuth } from "@/context/AuthContext";
import { withModal } from "@/hoc/withModal";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { ModalConfig } from "@/types/ModalConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Link, Redirect, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface PageProps {
  showModal: (config: ModalConfig) => void;
}
function Page({ showModal }: PageProps) {
  const { googleLoginMutation } = useAuthMutations();
  const { setUser } = useAuth();
  const handleSignIn = async () => {
    try {
      const res = await googleLoginMutation.mutateAsync();
      if (!res) {
        return;
      }
      if (res.needsLinking) {
        if (!res.email) {
          console.warn("Expected email to be present in response.");
          return;
        }
        showModal({
          icon: "info",
          title: "Email already in use",
          message: "Please log in with the email and password that is connected to this account",
          buttonStyle: { marginTop: 10 },
          onConfirm: () => {
            router.push({
              pathname: "/sign-in",
              params: { email: res.email },
            });
          },
        });
        return;
      }
      setUser(res.user as FirebaseAuthTypes.User);
      router.replace("/home");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 py-16 bg-background">
      <Image
        source={require("@/assets/images/logo/brewha_new.png")}
        className="absolute top-3 w-full -left-[90px] h-40"
        resizeMode="contain"
      />
      <View className="justify-center flex-1 ">
        <Text className="text-5xl leading-[60px] font-[Manrope-Semibold] text-foregroundText">Let's get started with your account</Text>
        <Text className="text-foregroundText/70 text-sm leading-6 font-[Manrope-Regular] mt-5">Get Ready to exprience a whole new way of enjoying coffee. From finding the perfect brew to discovering unique flavors</Text>
        <View className="mt-10">
          <SocialButton
            handleOAuth={handleSignIn}
            strategy={"oauth_google"}
            text="Sign in with Google"
          />
          <SocialButton
            handleOAuth={() => {}}
            strategy={"oauth_apple"}
            text="Sign in with Apple"
          />
          <View className="my-7">
            <Divider text="Or sign in with" />
          </View>
          <Link
            href={"/sign-in"}
            asChild
          >
            <TouchableOpacity className="flex-row items-center justify-center p-4 mb-2 rounded-full bg-primary-500">
              <Text className="text-white text-center font-[Manrope-Bold] mr-3">Sign in with Email</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      {googleLoginMutation.isPending && <LoadingScreen />}
    </SafeAreaView>
  );
}

export default withModal(Page);
