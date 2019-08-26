import React, {Component} from 'react';
import AppNavbar from './components/navigation/AppNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from "react-router-dom";
//Components
import AppLogin from "./components/login/Login";
import {Logout} from "./components/login/Logout";
import StudentList from "./components/student-list/StudentList";
import Home from "./components/home/Home";
import AddStudent from "./components/add-student/AddStudent";
import Attendance from './components/attendance/Attendance';
import EditStudent from './components/student-list/EditStudent';
import Fee from './components/fees/Fee';
import './index.css'
export default class App extends Component {
  render() {
    return (
      <div className='App'>
          <AppNavbar/> 
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list" component={StudentList} />
            <Route path="/add" component={AddStudent} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/login" component={AppLogin} />
            <Route path="/logout" component={Logout} />
            <Route path="/edit" component={EditStudent} />
            <Route path="/fees" component={Fee} />
          </Switch>
          {this.props.children}
      </div>
    )
  }
}
