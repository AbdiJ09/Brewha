import React from "react";
import CustomModal from "@/components/ModalCustom";
import { useModal } from "@/hooks/useModal";
import { ModalConfig } from "@/types/ModalConfig";

export const withModal = (WrappedComponent: React.ComponentType<any>) => {
  return function WithModalComponent(props: any) {
    const { isVisible, hideModal, handleConfirm, modalConfig, showModal } = useModal();

    return (
      <>
        <WrappedComponent
          {...props}
          showModal={(config: ModalConfig) => {
            showModal(config);
          }}
        />
        {modalConfig && (
          <CustomModal
            {...modalConfig}
            icon={modalConfig.icon || "info"}
            title={modalConfig.title}
            message={modalConfig.message}
            buttonText={modalConfig.buttonText || "OK"}
            buttonStyle={modalConfig.buttonStyle}
            visible={isVisible}
            onClose={hideModal}
            onButtonPress={handleConfirm}
          />
        )}
      </>
    );
  };
};
