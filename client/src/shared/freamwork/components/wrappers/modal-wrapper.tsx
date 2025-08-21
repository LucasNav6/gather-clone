import type { ReactNode } from "react";
import { Dialog, DialogContent } from "../../shadcn/ui/dialog";

interface ModalWrapperProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const ModalWrapper = ({ isOpen, children, onClose }: ModalWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};
