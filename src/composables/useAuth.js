import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const clientToken = ref(localStorage.getItem("clientToken"));
const staffToken = ref(localStorage.getItem("staffToken"));
const staffRole = ref(localStorage.getItem("staffRole"));

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => !!clientToken.value);
  const isStaffAuthenticated = computed(() => !!staffToken.value);

  // 客户端登录
  const clientSignIn = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/auth/signin", {
        email,
        password,
      });

      clientToken.value = response.data.data.token;
      localStorage.setItem("clientToken", clientToken.value);
      router.push({ name: "ClientIndex" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // 客户端注册
  const clientSignUp = async (userData) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", userData);

      clientToken.value = response.data.data.token;
      localStorage.setItem("clientToken", clientToken.value);
      router.push({ name: "ClientIndex" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // 员工登录
  const staffSignIn = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/staff/signin", {
        email,
        password,
      });

      staffToken.value = response.data.data.token;
      staffRole.value = response.data.data.role;
      localStorage.setItem("staffToken", staffToken.value);
      localStorage.setItem("staffRole", staffRole.value);

      const routeName =
        staffRole.value === "courier" ? "CourierPending" : "TruckerOperate";
      router.push({ name: routeName });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // 登出
  const signOut = async (isStaff = false) => {
    try {
      const token = isStaff ? staffToken.value : clientToken.value;
      await axios.post(
        `/api/v1/${isStaff ? "staff" : "auth"}/signout?token=${token}`
      );
    } finally {
      if (isStaff) {
        staffToken.value = null;
        localStorage.removeItem("staffToken");
        localStorage.removeItem("staffRole");
        router.push({ name: "StaffSignIn" });
      } else {
        clientToken.value = null;
        localStorage.removeItem("clientToken");
        router.push({ name: "ClientIndex" });
      }
    }
  };

  return {
    clientToken,
    staffToken,
    staffRole,
    isAuthenticated,
    isStaffAuthenticated,
    clientSignIn,
    clientSignUp,
    staffSignIn,
    signOut,
  };
}
