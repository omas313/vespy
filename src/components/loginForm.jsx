import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";
import { login } from "../services/authService";

const LoginForm = ({ history }) => {
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

  const handleSubmit = async () => {
    try {
      const { email, password } = data;
      const { data: jwt } = await login(email, password);
      localStorage.setItem("token", jwt);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = {
          email: ex.response.data,
          password: ex.response.data,
        };
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form
        formStyles={styles}
        data={data}
        onDataChange={setData}
        schema={schema}
        errors={errors}
        onErrorsChanged={setErrors}
        onSubmit={handleSubmit}
        submitButtonLabel="Login"
      >
        <Input
          type="email"
          placeholder="Enter your email..."
          name="email"
          value={data.email}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={data.password}
          error={errors.password}
        />
      </Form>
    </>
  );
};

export default LoginForm;
