import { NavLink } from "react-router-dom";

const Navbar = () => {
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
      <div>Vespe</div>
      <div style={linkContainerStyles}>
        <ul>
          <li style={listItemStyles}>
            <NavLink to="/vespe">Vespe</NavLink>
          </li>
          <li style={listItemStyles}>
            <NavLink to="/customers">Customers</NavLink>
          </li>
          <li style={listItemStyles}>
            <NavLink to="/rentals">Rentals</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
