import classNames from "classnames";
import styles from "./Todo.module.css";
import {useTodosContext} from "../Todos";
import {useEffect, useState} from "react";
import DoneIcon from "./DoneIcon";
import DeleteIcon from "./DeleteIcon";

const MAX_X_MOVE = 100;
const MIN_X_MOVE = -100;

export default function Todo({ name, bgColor, id }){
  const { deleteTodo, moveToComplete } = useTodosContext();
  const [moveData, setMoveData] = useState({
    isMouseDown: false,
    initX: 0,
    xMove: 0
  })
  const [toDelete, setToDelete] = useState(false);
  const [toComplete, setToComplete] = useState(false);

  useEffect(() => {
    setToDelete(moveData.xMove < -50);
    setToComplete(moveData.xMove > 50);
  }, [moveData.xMove])

  function initMovement(e){
    console.log("initMovement")
    console.log(e.changedTouches[0].clientX)
    setMoveData(moveData => ({
      ...moveData,
      isMouseDown: true,
      initX: e.changedTouches[0].clientX,
    }))
  }
  function stopMovement(){

    if(toDelete){
      deleteTodo(id);
    }

    if(toComplete){
      moveToComplete(id);
    }

    setMoveData(moveData => ({
      ...moveData,
      isMouseDown: false,
      initX: 0,
      xMove: 0
    }))
  }
  function movement(e){
    if(!moveData.isMouseDown){
      stopMovement();
      return;
    }

    console.log(e.changedTouches[0].clientX)

    setMoveData(moveData => ({
      ...moveData,
      xMove: Math.max(
        Math.min(
          e.changedTouches[0].clientX - moveData.initX,
          MAX_X_MOVE
        ), MIN_X_MOVE
      )
    }))
  }

  return <div className={styles.todoWrapper}>
    {toComplete && <DoneIcon/>}
    <div
      className={classNames("todoLayout", styles.todo)}
      style={{
        background: bgColor,
        transform: `translateX(${moveData.xMove}px)`,
        // transition: `transform 400ms ease-in-out`
      }}
      // onMouseDown={initMovement}
      // onMouseMove={movement}
      // onMouseUp={stopMovement}

      onTouchStart={initMovement}
      onTouchMove={movement}
      onTouchEnd={stopMovement}
      // onClick={() => deleteTodo(id)}
    >
      { name }
    </div>
    {toDelete && <DeleteIcon/>}
  </div>
}
