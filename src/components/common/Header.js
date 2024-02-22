import React from 'react';
import { Link } from 'react-router-dom';
//import "node_modules/bootstrap/dist/css/bootstrap.min.css";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button
} from 'reactstrap';
import ls from 'local-storage';
import { NavDropdown } from 'react-bootstrap';
// import { Button } from '@material-ui/core';

class Header extends React.Component {
  render() {
    let login;
    let logout;
    let register;
    let token = ls.get('token');
    //alert("token: "+token);

    if (token == "undefined" || token == "" || token == null) {
      //alert(1);
      logout = <span></span>;

      login = (
        <NavLink className="nav-link-icon mt-2" to="/gts/login" tag={Link}>
          {/* <i className="ni ni-planet" /> */}
          {/* <span style={spanStyle} className="nav-link-inner--text">
            Login
					</span> */}
          <button class="btn btn-light">Login</button>
        </NavLink>
      );

      register = (
        <NavLink className="nav-link-icon mt-2" to="/gts/register" tag={Link}>
          {/* <i className="ni ni-planet" /> */}
          {/* <span style={spanStyle} className="nav-link-inner--text">
            Register
					</span> */}
          <button class="btn btn-light">Register</button>
        </NavLink>
      );
    }
    else {
      logout = <span></span>;
      register = <span></span>;

      logout = (
        <NavLink className="nav-link-icon mt-2" to="/gts/global-home-page" tag={Link}>
          <i className="ni ni-planet" />
          {/* <span style={spanStyle} className="nav-link-inner--text">
            Logout
					</span> */}
          <button className="btn btn-light">Logout</button>
        </NavLink>
      );

    }

    return (
      <Navbar
        style={navbarStyle}
        className="navbar-horizontal navbar-dark navbar-fixed-top"
        expand="md"
      >
        <div className="w-100" style={menuStyle}>

        <NavbarBrand tag={Link} to="/home" style={spanStyle}>
          HOME
        </NavbarBrand>        

        <NavbarBrand tag={Link} to="/gts/about-us" style={spanStyle}>
          ABOUT US
        </NavbarBrand>

        <NavbarBrand tag={Link} to="/gts/contact-us" style={spanStyle}>
          CONTACT US
        </NavbarBrand>

        <NavbarBrand tag={Link} to="/gts/career" style={spanStyle}>
          CAREER
        </NavbarBrand>

        <NavbarBrand tag={Link} to="/gts/products" style={spanStyle}>
          OUR PRODUCTS
        </NavbarBrand>

        <NavbarBrand tag={Link} to="/gts/industry" style={spanStyle}>
          INDUSTRY
        </NavbarBrand>
        
        <NavbarBrand tag={Link} to="/gts/global-trainings" style={spanStyle}>
          TRAININGS
        </NavbarBrand>

        {/* <NavDropdown title={<span className="text-white">SEARCH</span>} id="nav-dropdown">
          <NavDropdown.Item tag={Link} href="/#">SEARCH SERVICES</NavDropdown.Item>
          <NavDropdown.Item tag={Link} href="/#">SEARCH SERVICE PROVIDERS</NavDropdown.Item>
          <NavDropdown.Item tag={Link} href="/#">SEARCH TRAININGS</NavDropdown.Item>
        </NavDropdown> */}

        <Nav className="" navbar>
          <NavItem>{login}</NavItem>
          <NavItem>{logout}</NavItem>
          <NavItem>{register}</NavItem>
        </Nav>

        
      </div>

      </Navbar>
    );
  }
}
const navbarStyle = {
  backgroundColor: '#007bff',
  padding: '0px 20px',
  position: 'overflow',
  with: '100vw',
  top: '0px',
  left: '0px'
};
const menuStyle ={
  display:'flex',
  justifyContent:"space-around",
  alignItems: "center",
  flexWrap:"wrap"
}
const spanStyle = {
  fontSize: '16px',
  //color: '#424242'
};

export default Header;