import * as actions from "./actionTypes";
const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.payload.user };
    case actions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
