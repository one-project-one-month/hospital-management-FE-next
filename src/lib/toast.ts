import { toast } from "sonner";

export const SuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "green",
      color: "white",
    },
  });
};

export const ErrorToast = (message: string) => {
  toast.error(message || "Error creating medicine", {
    style: {
      backgroundColor: "red",
      color: "white",
    },
  });
};
