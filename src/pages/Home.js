import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import * as apiCalls from "../api/calls";
import { addList, deleteList, setLists } from "../stateManagement/actions";
import { connect } from "react-redux";

const Home = (props) => {
  const [listName, setListName] = useState("");
  useEffect(() => {
    apiCalls.getLists().then((lists) => {
      props.setLists(lists);
    });
  }, []);
  const addList = async (name) => {
    let list = await apiCalls.addList(name);
    if (list != null) {
      props.addList(list);
    }
  };

  const deleteList = async (id) => {
    if (await apiCalls.deleteList(id)) {
      props.deleteList(id);
    }
  };

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
              onChange={(e) => setListName(e.target.value)}
              value={listName}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => addList(listName)}
            >
              Add New List
            </button>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {props.lists.map((list) => {
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
                    onClick={() => deleteList(list.id)}
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
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
});

const mapDispatchToProps = {
  addList: addList,
  deleteList: deleteList,
  setLists: setLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
