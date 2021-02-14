import React from 'react';
import PageHeader from '../common/pageHeader';
import Joi from 'joi-browser';
import http from '../services/httpService';
import { apiUrl } from "../../config.json";
import userService from '../services/userService';
import {Redirect} from 'react-router-dom';
import Form from '../common/form';
import { toast } from "react-toastify";

class SignUp extends Form {
    state = {
        data: {email: "", password: "", name:""},
        errors: {}
      }

      schema={
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).label("Password"),
        name: Joi.string().required().min(2).label("Name"),    
    }

    doSubmit = async () => {
        const {data} = this.state;
        try{
            await http.post(`${apiUrl}/users`, data);
            await userService.login(data.email, data.password);
            window.location = "/";
            this.props.history.replace('/signin');
            toast("A new acoount is opened", 5000);
            console.log("new user" + JSON.stringify(data));
            localStorage.setItem('users', JSON.stringify(data.email));
        }catch(ex){   if(ex.response && ex.response.status === 400){
            this.setState({errors: {email:`Email is taken ${ex.response.data}`}})
          }}
    }

    render() { 
       if(userService.getCurrentUser())return <Redirect to='/' />

        return ( <div className="col s12 m6">
            <PageHeader  pageTitle="Sign Up"/>

                    <form onSubmit={this.handleSubmit} 
                    autoComplete="off"
                     method="POST"
                     >
                        
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}    
                   
                    {this.renderButton("signup", "SignUp")}
                    </form>
          
        </div> );
    }
}
 
export default SignUp;