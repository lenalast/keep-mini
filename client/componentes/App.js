import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TodoList from './TodoList';
import Header from './Header';
import Test from './Test';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Route component={Header}/>
          <Route path="/lists" component={TodoList}/>
          <Route path="/test" component={Test}/>
        </div>
      </Router>
    );
  }
}

export default App;