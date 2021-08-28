import classNames from "classnames";
import styles from "./Todo.module.css";
import {useTodosContext} from "../Todos";

export default function Todo({ name, bgColor, id }){
  const { deleteTodo } = useTodosContext();
  return <div
    className={classNames("todoLayout", styles.todo)}
    style={{ background: bgColor }}
    onClick={() => deleteTodo(id)}
  >
    { name }
  </div>
}
