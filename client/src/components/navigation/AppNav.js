import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {AuthContext} from '../../context';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {    
    return (
      <AuthContext.Consumer>
        {context =>(
          <Navbar color='dark' dark expand='md'>
            {context.state.isAuth && <Redirect from='/login' to='/' />}
            {!context.state.isAuth && <Redirect from='/' to='/login' />}
            <NavbarBrand>
              <Link to='/'>
                <span className='navbar-brand'>NitMoi</span>
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <Link to='/list' className='nav-link'>
                    Students
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <Link to='/add' className='nav-link'>
                    Add
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <Link to='/attendance' className='nav-link'>
                    Attendance
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <Link to='/fees' className='nav-link'>
                    Fee
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink onClick={this.toggle}>
                {!context.state.isAuth&&<Link to='/login' className='nav-link'>
                    Login
                  </Link>}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                {context.state.isAuth&&<Link to='/logout' className='nav-link' onClick={context.handleLogout}>
                    Logout
                  </Link>}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </Navbar>
        )}
      </AuthContext.Consumer>
    )
  }
}