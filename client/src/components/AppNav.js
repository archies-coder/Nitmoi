import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
        <Link to='/'>
          <span className='navbar-brand'>NitMoi</span>
        </Link>
        <ul className="navbar-nav ml-5 align-items-center">
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
        </ul>
        
          <Link to='/login' className='ml-auto mr-0 nav-link'>
              <i className="fas fa-user-plus"></i>
              <i className="fas fa-sign-in-alt ml-3"></i>
          </Link>
      </nav>
      </React.Fragment>
    )
  }
}
