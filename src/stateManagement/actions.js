import * as actions from "./actionTypes";
export const setUser = (user) => ({
  type: actions.SET_USER,
  payload: {
    user: user,
  },
});

export const logout = () => ({
  type: actions.LOGOUT,
});

export const addList = (list) => ({
  type: actions.ADD_LIST,
  payload: {
    list: list,
  },
});

export const addTodo = (todo, list_id) => ({
  type: actions.ADD_TODO,
  payload: {
    todo: todo,
    list_id: list_id,
  },
});

export const deleteList = (list_id) => ({
  type: actions.DELETE_LIST,
  payload: {
    id: list_id,
  },
});

export const setLists = (lists) => ({
  type: actions.SET_LISTS,
  payload: {
    lists: lists,
  },
});

export const toggleTodo = (list_id, todo_id, value) => ({
  type: actions.TOGGLE_TODO,
  payload: {
    list_id: list_id,
    id: todo_id,
    value: value,
  },
});

export const setTodos = (list_id, todos) => ({
  type: actions.SET_TODOS,
  payload: {
    list_id: list_id,
    todos: todos,
  },
});
