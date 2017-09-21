import React, {Component} from 'react';
import CreateTodos from './CreateTodos';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos')
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
    this.saveTodoDone(todo)
  }

  createList(task) {
    this.state.todos.push(task);
    this.setState({todos: this.state.todos});
    console.log("the list:", this.state.todos)
  }

  saveTodoDone(todo) {
    console.log(todo)
    const params = {
      desc: todo.desc,
      isDone: todo.isDone,
      id: todo.id
    }

    const id = todo.id

    axios.patch('http://localhost:4000/todos/' + id, params)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }
}

export default TodoList;