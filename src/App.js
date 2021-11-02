import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Navbar from "./components/common/navbar";
import Vespe from "./components/vespe";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import VespaForm from "./components/vespa";

function App() {
  const links = [
    { url: "/vespe", label: "All Vespe" },
    { url: "/customers", label: "Customers" },
    { url: "/rentals", label: "Rentals" },
  ];

  return (
    <main>
      <Navbar brand="Vespe" links={links} />
      <Switch>
        <Route path="/vespe/:id" component={VespaForm} />
        <Route path="/vespe" component={Vespe} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/vespe" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
