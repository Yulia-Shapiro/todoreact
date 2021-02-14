import React from 'react';
import PageHeader from '../common/pageHeader';
import Joi from 'joi-browser';
import userService from '../services/userService';
import {Redirect} from 'react-router-dom';
import Form from '../common/form';
import { toast } from "react-toastify";

class SignIn extends Form {
    state = {
        data: {email: "", password: ""},
        errors: {}
      }

      schema={
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).label("Password")
    }

    doSubmit = async () => {
      const { email, password } = this.state.data;
        try{
          await userService.login(email, password);
          toast("welcome back ", 5000);
           window.location = "/";     
       }catch(ex){
          if(ex.response && ex.response.status === 400){
              this.setState({errors: {email: ex.response.data}})
          }
      }
    }

    render() { 
        if(userService.getCurrentUser())return <Redirect to='/' />

        return ( <div className="col s12 m6">
            <PageHeader  pageTitle="Sign In"/>
            

                    <form onSubmit={this.handleSubmit} 
                    autoComplete="off"
                     method="POST"
                     >
                        
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                   
                    {this.renderButton("signin")}
                    </form>
          
        </div> );
    }
}
 
export default SignIn;