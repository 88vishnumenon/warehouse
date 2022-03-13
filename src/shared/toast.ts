import iZtoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const toast = {
  error: (message: string, title = "Error") => {
    return iZtoast.error({
      title: title,
      message: message,
      position: "topRight",
    });
  },
  success: (message: string, title = "Success") => {
    return iZtoast.success({
      title: title,
      message: message,
      position: "topRight",
    });
  },
};

export default toast;
