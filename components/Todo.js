import classNames from "classnames";

export default function Todo({ name, bgColor }){
  return <div
    className={classNames("todoLayout")}
    style={{ background: bgColor }}
  >
    { name }
  </div>
}
