import AddTodoStyles from "./AddTodo.module.css";
import {useState} from "react";
import classNames from "classnames";
import {useTodosContext} from "../Todos";

export default function AddTodoCta(){
  const placeholder = "+ Add a Todo";
  const [todo, setTodo] = useState("");
  const [editing, setEditing] = useState(false)
  const { addTodo } = useTodosContext();
  return <form onSubmit={(e) => {
    e.preventDefault();
    if (todo) {
      addTodo(todo);
      setTodo("");
      setEditing(false);
    }
  }}>
    <input
      className={classNames(AddTodoStyles.addTodoCta, "todoLayout")}
      value={todo}
      placeholder={placeholder}
      onChange={(e) => setTodo(e.target.value)}
    />
  </form>
}
