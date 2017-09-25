import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import TodoList from "./TodoList";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Route component={Header}/>
          <Route exact path="/" component={Home}/>
          <Route path="/lists" component={TodoList}/>
        </div>
      </Router>
    );
  }
}

export default App;