import { createContext, useEffect, useState } from "react";
import request from "../lib/request";

const TodoContext = createContext(undefined);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    request("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getTodos = () => todos;

  return (
    <TodoContext.Provider value={{ getTodos }}>{children}</TodoContext.Provider>
  );
};

export { TodoContext };
export default TodoProvider;
