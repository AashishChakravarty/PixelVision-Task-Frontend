import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

function Header() {
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Pixel Vision</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      </Navbar.Collapse>
      <Nav>
        {location.pathname !== '/signup' && location.pathname !== '/login' &&
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        }
        {location.pathname === '/login' &&
          <Nav.Link onClick={() => history.push('/signup')}>Signup</Nav.Link>
        }
        {location.pathname === '/signup' &&
          <Nav.Link onClick={() => history.push('/login')}>Login</Nav.Link>
        }
      </Nav>
    </Navbar>
  );
}

export default Header;
