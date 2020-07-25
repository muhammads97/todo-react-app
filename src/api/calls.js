import axios from "axios";
import * as endPoints from "./endpoints";

export const login = async (email, password) => {
  let response = await axios.post(
    endPoints.login(),
    {
      email: email,
      password: password,
    },
    {
      headers: endPoints.headers,
    }
  );
  if (response.status == 200) {
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  }
  return null;
};

export const signup = async (email, password, name) => {
  let response = await axios.post(
    endPoints.users(),
    {
      email: email,
      password: password,
      name: name,
    },
    {
      headers: endPoints.headers,
    }
  );
  if (response.status == 200) {
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  }
  return null;
};

export const getUser = async () => {
  let token = localStorage.getItem("token");
  if (token != null) {
    //get user
    let response = await axios.get(endPoints.auto_login(), {
      headers: getHeaders(),
    });

    if (response.status == 200) {
      return response.data;
    }
  }
  return null;
};

export const getLists = async () => {
  let response = await axios.get(endPoints.list(), {
    headers: getHeaders(),
  });
  if (response.status == 200) {
    return response.data.lists;
  }
  return [];
};

export const getList = async (id) => {
  let response = await axios.get(endPoints.list(id), {
    headers: getHeaders(),
  });
  if (response.status == 200) {
    return response.data.list;
  }
  return null;
};

export const addList = async (name) => {
  let response = await axios.post(
    endPoints.list(),
    {
      name: name,
    },
    {
      headers: getHeaders(),
    }
  );
  if (response.status == 200) {
    return response.data.list;
  }
  return null;
};

export const deleteList = async (id) => {
  let response = await axios.delete(endPoints.list(id), {
    headers: getHeaders(),
  });
  if (response.status == 204) {
    return true;
  }
  return false;
};

export const getTodos = async (list_id) => {
  let response = await axios.get(endPoints.todo(list_id), {
    headers: getHeaders(),
  });
  if (response.status == 200) {
    return response.data.todos;
  }
  return [];
};

export const getTodo = async (list_id, id) => {
  let response = await axios.get(endPoints.todo(list_id, id), {
    headers: getHeaders(),
  });
  if (response.status == 200) {
    return response.data.todo;
  }
  return null;
};

export const addTodo = async (list_id, todo) => {
  let response = await axios.post(
    endPoints.todo(list_id),
    {
      todo: todo,
    },
    {
      headers: getHeaders(),
    }
  );
  if (response.status == 200) {
    return response.data.todo;
  }
  return null;
};

export const toggleTodo = async (list_id, id, value) => {
  let response = await axios.put(
    endPoints.todo(list_id, id),
    {
      done: value,
    },
    {
      headers: getHeaders(),
    }
  );

  if (response.status == 200) {
    return response.data.todo;
  }
  return null;
};

const getHeaders = () => {
  let token = localStorage.getItem("token");
  return {
    ...endPoints.headers,
    Authorization: `Bearer ${token}`,
  };
};
