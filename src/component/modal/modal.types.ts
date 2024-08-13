import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: Function;
  isFullScreen?: boolean;
  width?: number;
  height?: number;
  children?: ReactNode;
}
