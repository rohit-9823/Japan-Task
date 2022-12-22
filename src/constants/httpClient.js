import { toast } from "react-toastify";
import axiosInstance from "./api";
export const httpClient = {
  apiCall: async (data, method, url) => {
    try {
      let result = null;
      if (method == "GET") {
        result = await axiosInstance.get(url);
        return result;
      } else if (method == "POST") {
        result = await axiosInstance.post(url, data);

        toast.success(result.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        return result;
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  },
};
