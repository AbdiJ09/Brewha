import CustomModal from "@/components/ModalCustom";
import { ModalConfig } from "@/types/ModalConfig";
import { useState, useCallback } from "react";

interface UseModalReturn {
  isVisible: boolean;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  handleConfirm: () => void;
  modalConfig: ModalConfig | null;
}
export const useModal = (): UseModalReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const showModal = useCallback((config: ModalConfig) => {
    setModalConfig(config);
    setIsVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsVisible(false);
    setModalConfig(null);
  }, []);

  const handleConfirm = useCallback(() => {
    modalConfig?.onConfirm?.();
    hideModal();
  }, [modalConfig]);
  return {
    isVisible,
    showModal,
    hideModal,
    handleConfirm,
    modalConfig,
  };
};
