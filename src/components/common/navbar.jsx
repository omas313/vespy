import { Link, NavLink } from "react-router-dom";

const Navbar = ({ brand, links }) => {
  const navStyles = {
    display: "flex",
    padding: "1rem 2rem",
    alignItems: "center",
    background: "#223",
  };

  const linkContainerStyles = {
    marginLeft: "2rem",
    width: "100vw",
  };

  const listStyles = {
    marginBottom: "0",
    display: "flex",
  };

  const listItemStyles = {
    display: "inline-block",
    listStyle: "none",
    margin: "0 1rem",
  };

  return (
    <nav style={navStyles}>
      <div>
        <Link to="/">{brand}</Link>
      </div>
      <div style={linkContainerStyles}>
        <ul style={listStyles}>
          {links.map(l => (
            <li style={listItemStyles} key={l.url + l.label}>
              <NavLink to={l.url}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul style={listStyles}>
          <li style={listItemStyles}>
            <Link to="/login">Login</Link>
          </li>
          <li style={listItemStyles}>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
