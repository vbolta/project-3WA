const Form = ({ children, onSubmit }) => {
  const handleDefault = (event) => {
    event.preventDefault();
    onSubmit();
  };
  return <form onSubmit={handleDefault}>{children}</form>;
};

export default Form;
