import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {AuthContext} from '../../context';

export default class Navbar extends Component {
  render() {    
    return (
      <AuthContext.Consumer>
        {context =>(
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
            <Link to='/'>
              <span className='navbar-brand'>NitMoi</span>
            </Link>
            {context.state.isAuth && <Redirect from='/login' to='/'></Redirect>}
            {!context.state.isAuth && <Redirect from='/' to='/login'></Redirect>}

            {context.state.isAuth && <ul className="navbar-nav ml-5 align-items-center">
              <li className="nav-item  students-link">
                <Link to='/list' className='nav-link'>
                  Students
                </Link>
              </li>
              <li className="nav-item students-link">
                <Link to='/add' className='nav-link'>
                  Add
                </Link>
              </li>
              <li className="nav-item students-link">
                <Link to='/attendance' className='nav-link'>
                  Attendance
                </Link>
              </li>
              <li className="nav-item students-link">
                <Link to='/fees' className='nav-link'>
                  Fee
                </Link>
              </li>
            </ul>}
              <span className="navbar-nav ml-auto pull-right">
                  {!context.state.isAuth&&<span className="nav-item students-link pull-right">
                    <Link to='/login'
                    className='nav-link'>
                      {/* <i className="fas fa-user-plus"></i> */}
                      Login
                    </Link>
                  </span>}
                  {context.state.isAuth&&<li className="nav-item students-link ">
                    <a href='/' className='nav-link' onClick={context.handleLogout}>
                      {/* <i className="fas fa-sign-in-alt ml-3"></i> */}
                        LogOut
                    </a>
                  </li>}
              </span>
          </nav>
        )}
      </AuthContext.Consumer>
    )
  }
}