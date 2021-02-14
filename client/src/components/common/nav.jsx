import React, { Component } from 'react';
import todoService from "../services/todoService";
import {Navbar, Icon, Chip } from 'react-materialize';
import {NavLink, Link} from 'react-router-dom';

class Nav extends Component {
    state = { 
      currentUser:""
     }

   async componentDidMount(){
     const user = await todoService.getUser();
     const thisUser = user.data[0].name;
     this.setState({currentUser:thisUser})
    }

      userChips(){
        const {currentUser} = this.state;
        return(  
        <Chip
          close={false}
        >
          <span>🙍  </span>
          {currentUser}
        </Chip>)
    }
    render() { 
      const { user } = this.props;
      return (    
      <Navbar
          id="mobile-nav"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: 'left',
            inDuration: 250,
            outDuration: 200,
            preventScrolling: true
          }}
        >
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
          {user && (
            <NavLink to="/todos">My Todo</NavLink>
          )}  
          </li>
        </ul>
             
        <ul>  
          {!user && (
          <React.Fragment>
          <li>
            <NavLink to='/signup'>Sign Up</NavLink>
          </li>
          <li>
            <NavLink to='/signin'>Sign In</NavLink>   
          </li>       
            </React.Fragment>
          )}
          {user && ( 
          <React.Fragment>
            <li>
             {this.userChips()}
            </li>
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
          </React.Fragment>
            )}
        </ul>          
            </Navbar>  

      );
    }
}
 
export default Nav;