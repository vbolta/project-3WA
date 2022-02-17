import jwt_decode from "jwt-decode";

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("accessToken");
    return { ...jwt_decode(token), token };
  } catch (error) {
    return null;
  }
};

export const signOut = () => {
  localStorage.removeItem("accessToken");
};
