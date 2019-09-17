import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {AuthContext} from '../../context';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink
} from 'reactstrap';


export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = ()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {    
    return (
      <AuthContext.Consumer>
        {context =>(
          <Navbar color='dark' dark expand='md'>
            {context.state.isAuth && <Redirect from='/login' to='/add' />}
            {!context.state.isAuth && <Redirect from='/' to='/login' />}
            <NavbarBrand tag={Link} to='/'>
                <span className='navbar-brand'>NitMoi</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                  {context.state.isAuth &&<NavLink tag={Link} to='/list' className='nav-link'>
                    Students
                  </NavLink>}
                  {context.state.isAuth && <NavLink tag={Link} to='/add' className='nav-link'>
                    Add
                  </NavLink>}
                  {context.state.isAuth && <NavLink tag={Link} to='/attendance' className='nav-link'>
                    Attendance
                  </NavLink>}
                  {context.state.isAuth && <NavLink tag={Link} to='/fees' className='nav-link'>
                    Fee
                  </NavLink>}
              </Nav>
              <Nav className="ml-auto" navbar>
                  {!context.state.isAuth && <NavLink tag={Link} to='/login' className='nav-link'>
                    Login
                  </NavLink>}
                  {context.state.isAuth && <NavLink tag={Link} to='/logout' className='nav-link'>
                    Logout
                  </NavLink>}
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </AuthContext.Consumer>
    )
  }
}