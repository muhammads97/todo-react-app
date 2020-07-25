import * as actions from "./actionTypes";

const listReducer = (state = { lists: [] }, action) => {
  let index;
  switch (action.type) {
    case actions.ADD_LIST:
      let list = action.payload.list;
      list.todos = [];
      return { ...state, lists: [list, ...state.lists] };
    case actions.DELETE_LIST:
      let lists = state.lists.filter((list) => list.id != action.payload.id);
      return { ...state, lists: lists };
    case actions.SET_LISTS:
      let l = action.payload.lists;
      for (let i = 0; i < l.length; i++) {
        l[i].todos = [];
      }
      return { ...state, lists: l };
    case actions.ADD_TODO:
      index = state.lists.findIndex(
        (list) => list.id == action.payload.list_id
      );
      if (index != -1) {
        state.lists[index].todos.push(action.payload.todo);
      }
      return state;
    case actions.TOGGLE_TODO:
      index = state.lists.findIndex(
        (list) => list.id == action.payload.list_id
      );
      if (index != -1) {
        let todo_index = state.lists[index].todos.findIndex(
          (todo) => todo.id == action.payload.id
        );
        if (todo_index != -1) {
          state.lists[index].todos[todo_index].done = action.payload.value;
        }
      }
      return state;
    case actions.SET_TODOS:
      index = state.lists.findIndex(
        (list) => list.id == action.payload.list_id
      );
      if (index != -1) {
        state.lists[index].todos = action.payload.todos;
      }
    default:
      return state;
  }
};

export default listReducer;
