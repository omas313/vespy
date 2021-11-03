import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const styles = {
    margin: "0 10em",
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
          name="username"
          label="Username"
          value={data.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type="text"
          placeholder="Enter your name..."
          name="name"
          label="Name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <button className="button" disabled={validateForm()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
