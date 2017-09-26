import React, {Component} from 'react';
import axios from 'axios';

class ListName extends Component {
  render() {
    const {saveListName} = this.props;

    return (
      <div>
        <form onSubmit={(e) => this.saveListNameToDB(e, saveListName)}>
          <input type="text"
                 placeholder="List name"
                 ref={c => this.refs = c}
          />
        </form>
      </div>
    );
  }

  saveListNameToDB(e, saveListName) {
    e.preventDefault()

    const listNameValue = {
      name: this.refs.value,
      todos: []
    }

    axios.post('http://localhost:4000/todolists', listNameValue)
      .then(res => {
        this.refs.value = "";
        saveListName(res.data)
        console.log("data", res.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export default ListName;