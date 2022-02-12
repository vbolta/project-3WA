import { FaCheck } from "react-icons/fa";
import Field from "../components/Field";
import Form from "../components/Form";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/users/register", {
      name: data.name,
      mail: data.email,
      password: data.password,
    }).then(() => navigate("/"));
  };

  return (
    <>
      <h1>Créer un compte</h1>
      <Form onSubmit={handleSubmit}>
        <Field
          type="text"
          name="name"
          id="name"
          placeholder="Choisissez un pseudo"
          label="Nom d'utilisateur"
          value={data.name}
          onChange={handleChange}
        />
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
          Créer un compte
          <FaCheck className="me-2" />
        </button>
      </Form>
    </>
  );
};

export default RegisterPage;
