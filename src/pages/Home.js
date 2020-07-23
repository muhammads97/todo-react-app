import React from "react";
import { Link, Redirect } from "react-router-dom";
import getUser from "../utils";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: null,
      lists: [],
      listName: "",
    };
  }

  componentDidMount() {
    this.setState({ user: getUser() }, (value) => {
      this.setState({ loading: false });
      if (this.state.user != null) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/lists", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "*/*");
        let token = localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send();
        if (xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);
          this.setState({ lists: res.lists });
        }
      }
    });

    //fetch lists
  }

  onChangeListName(v) {
    this.setState({ listName: v });
  }

  addList() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/lists", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    let token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(
      JSON.stringify({
        name: this.state.listName,
      })
    );
    if (xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      let lists = this.state.lists;
      lists.push(res.list);
      this.setState({ lists: lists });
      this.setState({ listName: "" });
    }
  }

  deleteList(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/lists/" + id, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    let token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send();
    if (xhr.status == 204) {
      let lists = this.state.lists;
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id == id) {
          lists.splice(i, 1);
          break;
        }
      }
      this.setState({ lists: lists });
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
            <h4>Your Lists</h4>
            <div className="add-list-input">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="List Name"
                id="listName"
                onChange={(e) => this.onChangeListName(e.target.value)}
                value={this.state.listName}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.addList();
                }}
              >
                Add New List
              </button>
            </div>
            {/* <button type="button" class="btn btn-primary">
              Add New List
            </button> */}
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.lists.map((list) => {
                return (
                  <div className="todo-list">
                    <Link to={"/list/" + list.id}>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        {list.name}
                      </li>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.deleteList(list.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
