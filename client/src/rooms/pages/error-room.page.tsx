import { EmptyState } from "@/shared/freamwork/components/wrappers/empty-state.wrapper";
import { AlertCircle } from "lucide-react";

export const RoomListErrorPage = () => {
  return (
    <EmptyState
      icon={<AlertCircle size={64} />}
      title="Oops! Something went wrong..."
      description="We couldn't load your rooms. Try refreshing or check your connection."
      callToActionLabel="Retry"
      callToAction={() => console.log("Retry clicked")}
      secondaryActionLabel="Contact Support"
      secondaryAction={() => console.log("Contact Support clicked")}
    />
  );
};
