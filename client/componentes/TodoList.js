import React, {Component} from 'react';
import CreateTodos from './CreateTodos';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import ListName from './ListName';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoLists: [],
      tasks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos')
      .then(res => this.setState({todos: res.data}))
      .catch(err => console.error(err))

    axios.get('http://localhost:4000/todolists')
      .then(res => {
        this.setState({todoLists: res.data})
        console.log("todolists data respond:", res.data)
      })
      .catch(err => console.error(err))
  }

  render() {
    const {todos, todoLists, tasks} = this.state;

    return (
      <div className="todo-container">
        <Route exact path="/lists" render={() =>
          <div className="wrapper">
            <ListName saveListName={(listName) => this.saveListName(listName)}/>
            <div className="list-container">
              <div className="tasks-list">
                {
                  todoLists.filter(todolist => todolist)
                    .map((todolist, i) =>
                      <Link key={i}
                            className="list"
                            to="/lists/mylist"
                            onClick={() => this.setState({tasks: todolist.todos})}>
                        {todolist.name}
                      </Link>
                    )
                }
              </div>
            </div>
          </div>
        }/>
        <Route exact path="/lists/mylist" render={() =>
          <div className="list-wrapper">
            <div className="tasks-list">
              {
                tasks.filter(task => task)
                  .map((task, i) =>
                    <div className="todo-name" key={i}>
                      {task.desc}
                    </div>)
              }
              <Link className="list-link" to="/lists">See all lists</Link>
            </div>
          </div>
        }/>

        <Route exact path="/lists/list" render={() =>
          <div>
            <CreateTodos createList={(task) => this.createList(task)}/>
            <div className="tasks-list">
              {
                todos.filter(todo => !todo.isDone)
                  .map((todo, i) =>
                    <div key={i} className="list" onClick={() => this.toggleTask(todo)}>{todo.desc}</div>
                  )
              }
              <Link className="list-link" to="/lists/done">See All Done</Link>
            </div>
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
    );
  }

  toggleTask(todo) {
    const {todos} = this.state;
    todo.isDone = !todo.isDone;
    this.setState({todos})
    this.saveTodoDone(todo)
  }

  saveListName(listName) {
    this.state.todoLists.push(listName);
    this.setState({todoLists: this.state.todoLists})
  }


  createList(task) {
    this.state.todos.push(task);
    this.state.todos.map(todo => {
      this.setState({todos: todo, theList: this.state.todos})
    })
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

  saveListNameToDB(e) {
    e.preventDefault()

    const listNameValue = {
      name: this.refs.value,
    }

    axios.post('http://localhost:4000/todolists', listNameValue)
      .then(res => {
        this.refs.value = "";
        this.saveListName(res.data)
        console.log("data", res.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export default TodoList;