import React, { createContext, ReactNode, useContext } from "react";
import { useModal as useModalHook } from "@/hooks/useModal";
import { ModalConfig } from "@/types/ModalConfig";
import CustomModal from "@/components/ModalCustom";

// Buat context
interface ModalContextType {
  isVisible: boolean;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  handleConfirm: () => void;
  modalConfig: ModalConfig | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
interface ModalProviderProps {
  children: ReactNode;
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modal = useModalHook();

  return (
    <ModalContext.Provider value={modal}>
      {children}
      {modal.isVisible && (
        <CustomModal
          visible={modal.isVisible}
          onClose={modal.hideModal}
          icon={modal.modalConfig?.icon}
          title={modal.modalConfig?.title || ""}
          message={modal.modalConfig?.message || ""}
          buttonStyle={modal.modalConfig?.buttonStyle}
          onButtonPress={modal.handleConfirm}
        />
      )}
    </ModalContext.Provider>
  );
};

// Custom hook untuk mempermudah akses
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal harus digunakan di dalam ModalProvider");
  }
  return context;
};
