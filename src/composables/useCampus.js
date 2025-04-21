import { ref } from "vue";
import axios from "axios";
import { useAuth } from "./useAuth";

export function useCampus() {
  const { clientToken, staffToken } = useAuth();
  const isLoading = ref(false);
  const error = ref(null);

  const getAllCampuses = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get(`/api/v1/campus`, {
        params: { token: clientToken.value },
      });
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch campus";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getAllCampuses,
  };
}
