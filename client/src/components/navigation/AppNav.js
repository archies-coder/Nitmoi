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
                  <React.Fragment>
                    <NavLink>
                      <Link to='/list' className='nav-link'>
                        Students
                      </Link>
                    </NavLink>
                  </React.Fragment>
              </NavItem>
              <NavItem>
                <React.Fragment>
                    <NavLink>
                      <Link to='/add' className='nav-link'>
                        Add
                      </Link>
                    </NavLink>
                </React.Fragment>
              </NavItem>
              <NavItem>
                <React.Fragment>
                    <NavLink>
                      <Link to='/attendance' className='nav-link'>
                        Attendance
                      </Link>
                    </NavLink>
                </React.Fragment>
              </NavItem>
              <NavItem>
                <React.Fragment>
                  <NavLink>
                    <Link to='/fees' className='nav-link'>
                      Fee
                    </Link>
                  </NavLink>
                </React.Fragment>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <React.Fragment>
                <NavLink>
                {!context.state.isAuth&&<Link to='/login' className='nav-link'>
                    Login
                  </Link>}
                </NavLink>
              </React.Fragment>
              </NavItem>
                <NavItem>
                  <React.Fragment>
                    <NavLink>
                      {context.state.isAuth && <Link to='/logout' className='nav-link' onClick={context.handleLogout}>
                        Logout
                      </Link>}
                    </NavLink>
                  </React.Fragment>
                </NavItem>
            </Nav>
          </Collapse>
          </Navbar>
        )}
      </AuthContext.Consumer>
    )
  }
}