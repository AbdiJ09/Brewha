import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
export const useBottomSheetModal = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={bottomSheetRef.current?.close()}
      />
    ),
    []
  );
  return { bottomSheetRef, openBottomSheet, renderBackdrop };
};
