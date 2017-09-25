import React, {Component} from 'react';
import {get} from "axios";
import {Link} from "react-router-dom";
import CreateTodos from './CreateTodos';

class TaskList extends Component {

  state = {
    list: {
      todos: [],
    }
  }

  componentDidMount() {
    const {match} = this.props;
    console.log(match);
    get('http://localhost:4000/todoLists/' + match.params.foo)
      .then((res) => this.setState({list: res.data}))
      .catch(err => console.error(err))
  }

  render() {
    const {list} = this.state;
    const styles = {
      width: 300,
      margin: "32px auto",
      padding: 20,
      backgroundColor: "white",
    }

    return (
      <div>
        <CreateTodos createList={(task) => this.createTodo(task)} todos={[]}/>
        <div style={styles}>
          <Link to="/lists">
            <small> {'<'} GO BACK</small>
          </Link>
          <h1 style={{margin: "16px 0"}}>{list.name}</h1>
          {
            list.todos.map(todo =>
              <div key={todo.id}>{todo.desc}</div>
            )
          }
        </div>
      </div>
    );
  }
}

export default TaskList;