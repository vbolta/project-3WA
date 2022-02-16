import { FaCheck, FaUnlock } from "react-icons/fa";
import Field from "../components/Field";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getCurrentUser } from "../services/Authentification";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  Axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    await Axios.post("http://localhost:3001/users/login", {
      mail: data.email,
      password: data.password,
    }).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      localStorage.setItem("accessToken", response.data);
      console.log(response);
      // user = getCurrentUser();
      // console.log(user);

      navigate("/");
      window.location.reload(false);
      toast.success("Connexion réussie");
    });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/users/login", {
  //     headers: { "x-access-token": localStorage.getItem("token") },
  //   }).then((response) => {
  //     if (localStorage.getItem("token")) {
  //       console.log(response.data.loggedIn);
  //     }
  //   });
  // }, []);

  return (
    <>
      <h1>Connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="Votre adresse email"
          label="Adresse email"
          value={data.email}
          onChange={handleChange}
        />
        <Field
          type="password"
          name="password"
          id="password"
          placeholder="Votre adresse mot de passe"
          label="Mot de passe"
          value={data.password}
          onChange={handleChange}
        />
        <button className="btn btn-succes">
          Connexion <FaUnlock className="me-2" />
        </button>
      </Form>
    </>
  );
};

export default LoginPage;
