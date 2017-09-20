import React, {Component} from 'react';
import CreateTodos from './CreateTodos';
import fetchData  from '../api/Mockdata';
import get from 'axios';
import {Route, Link} from 'react-router-dom';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    get('http://localhost:4000/todos')
      .then(res => this.setState({todos: res.data}))
      .catch(err => console.error(err))
  }

  render() {
    const {todos} = this.state;

    return (
      <div>
        <CreateTodos createList={this.createList.bind(this)}/>
        <div className="todo-container">
          <Route exact path="/lists" render={() =>
              <div className="tasks-list">
                  <h2>Unchecked todos</h2>
                  {
                    todos.filter(todo => !todo.isDone)
                      .map((todo, i) =>
                        <div key={i} className="list" onClick={() => this.toggleTask(todo)}>{todo.desc}</div>
                      )
                  }
                  <Link className="list-link" to="/lists/done">See All Done</Link>
            </div>
          }/>
          <Route exact path="/lists/done" render={() =>
            <div className="tasks-list">
              <div>
              <h2>Checked todos</h2>
              {
                todos.filter(todo => todo.isDone)
                  .map((todo, i) =>
                    <div key={i} className="checked list" onClick={() => this.toggleTask(todo)}>{todo.desc}</div>
                  )
              }
              <Link className="list-link" to="/lists">See todos</Link>
              </div>
            </div>
          }/>
        </div>
      </div>
    );
  }

  toggleTask(todo) {
    const {todos} = this.state;
    todo.isDone = !todo.isDone;
    this.setState({todos})
  }

  createList(task) {
    this.state.todos.push(task);
    this.setState({todos: this.state.todos});
    console.log("the list:", this.state.todos)
  }
}

export default TodoList;