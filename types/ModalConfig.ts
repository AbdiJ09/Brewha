export interface ModalConfig {
  icon?: string;
  title: string;
  message: string;
  buttonText?: string;
  iconColor?: string;
  buttonStyle?: object;
  modalBackgroundColor?: string;
  titleStyle?: object; // custom style untuk title
  messageStyle?: object; // custom style untuk message
  buttonTextStyle?: object; // custom style untuk text button
  closeIconColor?: string;
  closeIconSize?: number;
  customIcon?: React.ReactNode;
  showCloseIcon?: boolean;
  closeIconPosition?: string; // 'left' or 'right'
  closeOnBackdropPress?: boolean;
  onConfirm?: () => void;
}
