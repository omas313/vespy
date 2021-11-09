import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Navbar from "./components/common/navbar";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/rentals";
import VespaForm from "./components/vespaForm";
import Vespe from "./components/vespe";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const links = [
    { url: "/vespe", label: "All Vespe" },
    { url: "/customers", label: "Customers" },
    { url: "/rentals", label: "Rentals" },
  ];

  return (
    <main>
      <ToastContainer position="bottom-right" />
      <Navbar brand="Vespy" links={links} user={user} />
      <Switch>
        <Route path="/vespe/new" component={VespaForm} />
        <Route path="/vespe/:id" component={VespaForm} />
        <Route path="/vespe" component={Vespe} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Redirect exact from="/" to="/vespe" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
