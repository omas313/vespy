import { Redirect, Route, Switch } from "react-router";
import Navbar from "./components/common/navbar";
import Vespe from "./components/vespe";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import VespaForm from "./components/vespaForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  const links = [
    { url: "/vespe", label: "All Vespe" },
    { url: "/customers", label: "Customers" },
    { url: "/rentals", label: "Rentals" },
  ];

  return (
    <main>
      <Navbar brand="Vespy" links={links} />
      <Switch>
        <Route path="/vespe/new" component={VespaForm} />
        <Route path="/vespe/:id" component={VespaForm} />
        <Route path="/vespe" component={Vespe} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Redirect exact from="/" to="/vespe" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
