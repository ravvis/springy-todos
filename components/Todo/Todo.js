import classNames from "classnames";
import styles from "./Todo.module.css";

export default function Todo({ name, bgColor }){
  return <div
    className={classNames("todoLayout", styles.todo)}
    style={{ background: bgColor }}
  >
    { name }
  </div>
}
