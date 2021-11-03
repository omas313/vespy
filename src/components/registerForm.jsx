import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

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

  const handleSubmit = () => {
    console.log("form submitted");
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
          name="username"
          label="Username"
          value={data.username}
          error={errors.username}
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
