import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import getUser from "../utils";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: null,
      list: null,
      todos: [],
      todoText: "",
    };
  }

  componentDidMount() {
    this.setState({ user: getUser() }, (value) => {
      this.setState({ loading: false });
      if (this.state.user != null) {
        let path = this.props.location.pathname;
        let id = path.split("/")[2];
        // get list

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/lists/" + id, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "*/*");
        let token = localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send();
        if (xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);
          this.setState({ list: res.list });
        }

        //get todos

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/lists/" + id + "/todos", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "*/*");
        // let token = localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send();
        if (xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);
          this.setState({ todos: res.todos });
        }
      }
    });

    //fetch lists
  }

  onChangeTodoText(value) {
    this.setState({ todoText: value });
  }

  addTodo() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "http://localhost:3000/lists/" + this.state.list.id + "/todos",
      false
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    let token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(
      JSON.stringify({
        todo: this.state.todoText,
      })
    );
    if (xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      let todos = this.state.todos;
      todos.push(res.todo);
      this.setState({ todos: todos });
      this.setState({ todoText: "" });
    }
  }
  toggleTodo(id, value) {
    var xhr = new XMLHttpRequest();

    xhr.open(
      "PUT",
      "http://localhost:3000/lists/" + this.state.list.id + "/todos/" + id,
      false
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    let token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(
      JSON.stringify({
        done: value,
      })
    );
    if (xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      let todos = this.state.todos;
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
          todos[i].done = value;
          break;
        }
      }
      this.setState({ todos: todos });
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    if (this.state.user == null) {
      return <Redirect to="/signup" />;
    }
    return (
      <div className="container home">
        <div className="card border-primary mb-3">
          <div className="card-header">
            <h4>List Name</h4>
            <div className="add-list-input">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Todo"
                id="listName"
                onChange={(e) => this.onChangeTodoText(e.target.value)}
                value={this.state.todoText}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.addTodo();
                }}
              >
                Add New Todo
              </button>
            </div>
          </div>
          <div className="card-body">
            {this.state.todos.map((todo) => {
              return (
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={"customCheck" + todo.id}
                    checked={todo.done}
                    onChange={(e) => this.toggleTodo(todo.id, e.target.value)}
                  />
                  <label
                    className={
                      todo.done
                        ? "custom-control-label todo-done"
                        : "custom-control-label"
                    }
                    htmlFor={"customCheck" + todo.id}
                  >
                    {todo.todo}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
