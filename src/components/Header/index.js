import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../actions";


const Header = (props) => {


  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  }

  const renderLoggedIn = () => {
    return (

      <Nav className="ms-auto mx-5">
        <li className="nav-item mx-2 ">
          <span className="nav-link" onClick={logout}>
            SignOut
          </span>
        </li>

      </Nav>

    );
  }


  const renderNonLoggedIn = () => {
    return (

      <Nav className="ms-auto mx-5">
        <li className="nav-item mx-2 ">
          <NavLink to="login" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item mx-2">
          <NavLink to="register" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>


    );

  }
  return (
    <Navbar

      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid >
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand ">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};


export default Header;

