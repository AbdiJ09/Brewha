import CustomModal from "@/components/ModalCustom";
import { Href, router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function VerifyEmailSuccess() {
  const [visible, setVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Track verification status
  const { oobCode, continueUrl } = useGlobalSearchParams<{
    oobCode: string;
    continueUrl: string;
  }>();

  useEffect(() => {
    setVisible(true);
    if (!oobCode) {
      return;
    }

    const applyActionCode = async () => {
      try {
        const result = await auth().checkActionCode(oobCode);

        if (result) {
          await auth().applyActionCode(oobCode);
          await auth().currentUser?.reload(); // First reload for verification
          setIsVerified(true); // Update verification status
        }
      } catch (error) {
        console.log(error);
      }
    };

    applyActionCode();
  }, []);

  const handleContinue = async () => {
    setVisible(false);
    if (isVerified) {
      // Only reload if verification is complete
      await auth().currentUser?.reload(); // Second reload for navigation
    }

    if (continueUrl) {
      router.replace(continueUrl as Href);
    } else {
      router.push("/home");
    }
  };

  return (
    <CustomModal
      title="Success"
      message="Email has been verified"
      icon="check"
      onClose={() => setVisible(false)}
      onButtonPress={handleContinue}
      visible={visible}
    />
  );
}
