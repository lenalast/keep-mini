import React, {Component} from 'react';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
import TaskList from "./TaskList";

class TodoListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoLists: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todoLists')
      .then(res => this.setState({todoLists: res.data}))
      .catch(err => console.error(err))
  }

  render() {
    const {todoLists} = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/lists" render={() =>
            <div className="todo-container">
              {
                todoLists.map(({ id, name, todos })=>
                  <div key={id}>
                    <h3><Link to={"/lists/" + id}>{name}</Link></h3>
                  </div>
                )
              }
            </div>
          }/>
          <Route path="/lists/:foo" component={TaskList}/>
        </Switch>
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

export default TodoListTest;