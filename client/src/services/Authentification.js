import Axios from "axios";
import jwt_decode from "jwt-decode";
const url = "http://localhost:3001";

export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post(url + "/users", user);
      resolve({
        ...response,
        message: "Votre inscription a bien été enregistrée",
      });
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        // Case where the email address is already used
        if (status === 400 && data.code === 11000) {
          reject({ ...error, message: data.message });
        }
      }
      reject(error);
    }
  });
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("accessToken");
    return { ...jwt_decode(token), token };
  } catch (error) {
    return null;
  }
};

export const signIn = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post(url + "/users/login", user);
      const { token } = response.data;
      localStorage.setItem("accessToken", token);
      resolve({
        ...response,
        user: getCurrentUser(),
        message: "Connexion réussie !",
      });
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        reject({ ...error, message });
      }
      reject(error);
    }
  });
};

export const signOut = () => {
  localStorage.removeItem("accessToken");
};
