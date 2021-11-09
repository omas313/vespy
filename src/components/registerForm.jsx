import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";
import auth from "../services/authService";
import { register } from "../services/userService";

const LoginForm = ({ history }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const styles = {
    margin: "0 10em",
  };

  const handleSubmit = async () => {
    try {
      const response = await register(data);
      auth.loginWithToken(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = {
          ...errors,
          email: ex.response.data,
        };
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <h2>Register</h2>
      <Form
        formStyles={styles}
        data={data}
        onDataChange={setData}
        schema={schema}
        errors={errors}
        onErrorsChanged={setErrors}
        onSubmit={handleSubmit}
        submitButtonLabel="Register"
      >
        <Input
          type="email"
          placeholder="Enter your email..."
          name="email"
          label="Email"
          value={data.email}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          name="password"
          label="Password"
          value={data.password}
          error={errors.password}
        />
        <Input
          type="text"
          placeholder="Enter your name..."
          name="name"
          label="Name"
          value={data.name}
          error={errors.name}
        />
      </Form>
    </>
  );
};

export default LoginForm;
