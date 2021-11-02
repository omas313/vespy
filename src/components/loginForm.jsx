import React, { useEffect } from "react";

const LoginForm = () => {
  const emailRef = React.createRef();

  const styles = {
    margin: "0 10em",
    textAlign: "center",
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log("form submitted");
  };

  useEffect(() => {
    emailRef.current.focus();
    console.log(emailRef.current.value);
  });

  return (
    <div style={styles}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email..." ref={emailRef} />
        <input type="password" placeholder="Enter your password..." />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
