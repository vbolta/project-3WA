import React from "react";

const Field = ({ type, name, id, placeholder, value, onChange, label }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(name, value);
  };

  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Field;
