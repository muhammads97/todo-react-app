const base = "http://localhost:3000/";
export const users = () => base + "users";
export const login = () => base + "login";
export const auto_login = () => base + "auto_login";
export const todo = (list_id, id = "") => `${base}lists/${list_id}/todos/${id}`;
export const list = (id = "") => `${base}lists/${id}`;

export const headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
};
