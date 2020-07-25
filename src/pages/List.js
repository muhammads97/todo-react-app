import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import * as apiCalls from "../api/calls";
import { addTodo, toggleTodo, setTodos } from "../stateManagement/actions";
import { connect } from "react-redux";

const List = (props) => {
  const [todoText, setTodoText] = useState("");
  let path = props.location.pathname;
  let id = path.split("/")[2];

  useEffect(() => {
    apiCalls.getTodos(id).then((todos) => {
      props.setTodos(id, todos);
    });
  });
  let list;
  for (let i = 0; i < props.lists.lists.length; i++) {
    if (props.lists.lists[i].id == parseInt(id)) {
      list = props.lists.lists[i];
    }
  }

  const addTodo = async (t) => {
    let todo = await apiCalls.addTodo(list.id, t);
    if (todo != null) {
      props.addTodo(list.id, t);
    }
  };
  const toggleTodo = async (id, value) => {
    let todo = await apiCalls.toggleTodo(list.id, id, value);
    if (todo != null) {
      props.toggleTodo(list.id, id, value);
    }
  };

  return (
    <div className="container home">
      <div className="card border-primary mb-3">
        <div className="card-header">
          <h4>{list.name}</h4>
          <div className="add-list-input">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Todo"
              id="listName"
              onChange={(e) => setTodoText(e.target.value)}
              value={todoText}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                addTodo(todoText);
              }}
            >
              Add New Todo
            </button>
          </div>
        </div>
        <div className="card-body">
          {list.todos.map((todo) => {
            return (
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={"customCheck" + todo.id}
                  checked={todo.done}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
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
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  addTodo: addTodo,
  toggleTodo: toggleTodo,
  setTodos: setTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
