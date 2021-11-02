import React, { useState } from "react";
import Input from "./common/input";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const styles = {
    margin: "0 10em",
    textAlign: "center",
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log("form submitted");
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
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
        />
        <Input
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
