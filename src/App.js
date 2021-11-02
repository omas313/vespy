import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Navbar from "./components/common/navbar";
import Vespe from "./components/vespe";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
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
