import { Redirect, Route } from "react-router";
import auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!auth.getCurrentUser()) return <Redirect to="/login" />;

      return Component ? <Component {...props} /> : render(props);
    }}
  />
);

export default ProtectedRoute;