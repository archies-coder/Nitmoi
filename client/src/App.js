import React, {Component} from 'react';
import Navbar from './components/navigation/AppNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect } from "react-router-dom";
//Components
import AppLogin from "./components/login/Login";
import {Logout} from "./components/login/Logout";
import StudentList from "./components/student-list/StudentList";
import Home from "./components/home/Home";
import AddStudent from "./components/add-student/AddStudent";
import Attendance from './components/attendance/Attendance';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  render() {
    return (
      <div className='App'>
          <Navbar/> 
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list" component={StudentList} />
            <Route path="/add" component={AddStudent} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/login" component={AppLogin} />
            <Route path="/logout" component={Logout} />
          </Switch>
          {this.props.children}
      </div>
    )
  }
}
