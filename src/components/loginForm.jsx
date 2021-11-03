import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const styles = {
    margin: "0 10em",
    textAlign: "center",
  };

  const validateInput = ({ name, value }) => {
    const subObject = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(subObject, subSchema);

    return error ? error.details[0].message : null;
  };

  const validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const newErrors = error.details.reduce((allErrors, currentItem) => {
      const propName = currentItem.path[0];
      const hasProp = Boolean(allErrors[propName]);
      const message = currentItem.message + ".";

      allErrors[propName] = hasProp
        ? `${allErrors[propName]} ${message}`
        : message;
      return allErrors;
    }, {});

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors || {});
    if (newErrors && Object.keys(newErrors).length > 0) return;

    console.log("form submitted");
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };

    const errorMessage = validateInput(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    setData({
      ...data,
      [input.name]: input.value,
    });
    setErrors(newErrors);
  };

  return (
    <div style={styles}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email..."
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button className="button" disabled={validateForm()}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
