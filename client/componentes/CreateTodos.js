import React, {Component} from 'react';
import axios from 'axios';

class CreateTodos extends Component {

  render() {
    const {createList} = this.props;
    return (
      <div className="form">
        <form onSubmit={(e) => this.saveToList(e, createList)}>
          <input
            className="text-input"
            type="text"
            placeholder="What todo?"
            ref={c => this.refs = c}
          />
        </form>
      </div>
    );
  }

  saveToList(e, createList) {
    e.preventDefault();

    const todo = {
      desc: this.refs.value,
      isDone: false
    }

    axios.post('http://localhost:4000/todos', todo)
      .then(response => {
        this.refs.value = "";
        createList(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}


export default CreateTodos;