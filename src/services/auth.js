import API from "./api";

export const registerUser = async (data) => {
  const res = await API.post("/auth/register/", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login/", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
