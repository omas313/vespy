import { NavLink } from "react-router-dom";

const Navbar = ({ brand, links }) => {
  const navStyles = {
    display: "flex",
  };

  const linkContainerStyles = {
    marginLeft: "2rem",
  };

  const listItemStyles = {
    display: "inline-block",
    listStyle: "none",
    marginLeft: "1rem",
  };

  return (
    <nav style={navStyles}>
      <div>
        <NavLink to="/">{brand}</NavLink>
      </div>
      <div style={linkContainerStyles}>
        <ul>
          {links.map(l => (
            <li style={listItemStyles} key={l.url + l.label}>
              <NavLink to={l.url}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
