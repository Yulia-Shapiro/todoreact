import React, { Component } from 'react';
import PageHeader from '../common/pageHeader';
import todoService from "../services/todoService";
import HomeTodosList from './homeTodosList';
import { Row, Col, Button } from 'react-materialize';
import {Link} from 'react-router-dom';



class Home extends Component {
    state = { 
        users:[],
        thisUser:"",
       
     }
 
    async componentDidMount(){
    const {data} = await todoService.getMyUsers();
    this.setState({users:data.users});
   
    const user = await todoService.getUser();
    // console.log(user.data[0].name);
    const thisUser = user.data[0].name;
    this.setState({thisUser})
    }

    userCard = async(e, userId)=>{
    // console.log("TUT HI", e.target, userId);

    }

    render() {
        const {users, thisUser} = this.state;
        
        return ( <div className="minWidth">
            <PageHeader pageTitle="Home sweet home" />
                {thisUser ? <p>now you can view at todos from other users: </p> :
                 <p> new opportunities will appear after registration
                    <Link className="" to="/signin">
                        <Button
                            flat
                            node="button"
                            style={{
                            color: 'white',
                            border: '1px solid rgb(236, 236, 236)',
                            borderRadius: '10px',
                            marginLeft: '10px'
                            }}
                            waves="light"
                        > Sign in</Button>
                     </Link>
                 </p>}

            <Row>
               {users.map(user=> <Col s={12} m={12} l={3} className="userTodoCards white-text lightbox" key={user._id} onClick={(e)=>this.userCard(e,user._id)}>
                user name: <b> {user.name} </b>
                <hr/>
               <HomeTodosList userId={user._id} />
                 
               </Col>)}
            </Row>
            
             
        </div> );
    }
}
 
export default Home;