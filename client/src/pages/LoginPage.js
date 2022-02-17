import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import toast from "react-hot-toast";
import Field from "../components/Field";
import Form from "../components/Form";
import { FaUnlock } from "react-icons/fa";

const LoginPage = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  Axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    await Axios.post(process.env.REACT_APP_SERVER_URL + "/users/login", {
      mail: data.email,
      password: data.password,
    }).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      localStorage.setItem("accessToken", response.data);
      navigate("/");
      setAuthenticated(true);
      toast.success("Connexion réussie");
    });
  };

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
