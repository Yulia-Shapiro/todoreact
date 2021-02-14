import React, { Component } from 'react';
import {TextInput} from 'react-materialize';

class SearchTodo extends Component {
    state = { 
        search:'',
     }
     searchTodo = (e) => {
      const value = e.target.value 
      this.setState({search:value});
      this.props.onSearch(value);
     }

    render() { 
        const {search} = this.state;
        return (
              <TextInput
               className="input-field col white-text"
               id="TextInput-4"
               label="find todo"
               value={search}
               onChange={this.searchTodo}
               icon="search"
             />
             );
    }
}
 
export default SearchTodo;