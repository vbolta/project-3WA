import Axios from "axios";
import jwt_decode from "jwt-decode";
const url = "http://localhost:3001";

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
