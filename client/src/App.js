import React, { Component } from 'react';
import './App.css';
import Nav from './components/common/nav';
import Home from './components/home/home';
import MyTodos from "./components/todo/mytodo";
import SignIn  from "./components/users/signIn";
import SignUp from "./components/users/signup";
import Logout from "./components/users/logout";
import {Switch, Route} from 'react-router-dom';
import userService from './components/services/userService';
import ProtectedRoute from './components/common/protectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component  {
  state={};

    componentDidMount(){
      const user = userService.getCurrentUser();
      this.setState({user});
    }

  render(){
    const {user} = this.state;

  return (
    <React.Fragment>
      <ToastContainer />
     <div className="App"> 
     <header>
        <Nav user={user} />
      </header>    
      <main className="App-main">
        <Switch>
         <ProtectedRoute  path="/todos" component={MyTodos}/>

          <Route path="/logout" component={Logout}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/" component={Home} exact/>
          
         </Switch>
      </main> 
       
     </div> 
      </React.Fragment>
  );
}
}
export default App;

