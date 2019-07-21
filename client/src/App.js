import React, {Component} from 'react';
import Navbar from './components/AppNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
//Components
import AppLogin from "./components/Login";
import StudentList from "./components/StudentList";
// import StudentDetails from "./components/Details";
import Home from "./components/Home";
import AddStudent from "./components/AddStudent";
export default class App extends Component {
 

  render() {
    return (
      <div className='App'>
        <React.Fragment>
          <Navbar />
          <Switch>
            {/* {!this.state.token && <Redirect from="/" to="/login" exact />}
            {this.state.token && <Redirect from="/login" to="/" exact />} */}
            <Route exact path="/" component={Home} />
            <Route exact path="/list"component={StudentList} />
            <Route exact path="/add" component={AddStudent} />
            {/* {this.state.token && (
              <Route path="/details" component={StudentDetails} />
            )} */}
            <Route path="/login"  component={AppLogin} />
            {/* <Route path="/register" component={AppRegister} /> */}
          </Switch>
      </React.Fragment>
      </div>
    )
  }
}
