import toast from "react-hot-toast";
import { ErrorEnum } from "./error-enums";

const errorMessageList = [
  {
    code: ErrorEnum.emptyField,
    message: "Please set KeyWord and try again.",
  },
];
export const errorMessageHandler = (error: ErrorEnum | string) => {
  const errorMessage = errorMessageList.find(
    (err) => err.code === error
  )?.message;
  toast.error(errorMessage ? errorMessage : error || "Internal server error", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
