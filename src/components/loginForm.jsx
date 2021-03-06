import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router";

const LoginForm = ({ location }) => {
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
      await auth.login(email, password);

      const { state } = location;
      window.location = state ? state.from.pathname : "/";
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

  if (auth.getCurrentUser()) return <Redirect to="/" />;

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
