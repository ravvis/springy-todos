import {createContext, useContext, useMemo, useState} from "react";
import Todo from "./Todo/Todo";
import AddTodoCta from "./AddTodo/AddTodoCta";
import {getFancyGradient} from "../utils";
import generateRandomId from "generate-random-id";
import useSound from "use-sound";
const TodosContext = createContext({})
const deleteTodoSound = "/sounds/delete.mp3";
const addTodoSound = "/sounds/add.mp3";
const completedTodoSound = "/sounds/completed.mp3";

export function useTodosContext(){
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodosContext must be used within a TodosContextProvider')
  }
  return context
}

const todoStatus = {
  "pending": "pending",
  "completed": "completed",
  "deleted": "deleted"
}

export default function Todos() {
  const [playDeleteSound] = useSound(deleteTodoSound);
  const [playAddSound] = useSound(addTodoSound);
  const [playCompletedSound] = useSound(completedTodoSound);

  const [todos, setTodos] = useState([
    {
      name: "Pickup veggies"
    },
    {
      name: "Finish PR review"
    },
    {
      name: "Refactor configure funnel"
    },
    {
      name: "Drink water!!"
    }
  ].map(todo => ({
    ...todo,
    id: generateRandomId(),
    bgColor: getFancyGradient(),
    status: todoStatus.pending
  })));

  const completed = useMemo(() => todos.filter(todo => todo.status === todoStatus.completed), [todos])
  const pending = useMemo(() => todos.filter(todo => todo.status === todoStatus.pending), [todos])
  const deleted = useMemo(() => todos.filter(todo => todo.status === todoStatus.deleted), [todos])

  function addTodo(todo){
    if(!todo) return;

    setTodos([{
      name: todo,
      id: generateRandomId(),
      bgColor: getFancyGradient(),
      status: todoStatus.pending
    }, ...todos]);

    playAddSound();
  }

  function deleteTodo(id){
    if(!id) return;

    const todoIdx = todos.findIndex(todo => todo.id === id);

    if(todoIdx < 0) return;

    setTodos([
      ...todos.slice(0, todoIdx),
      {
        ...todos[todoIdx],
        status: todoStatus.deleted
      },
      ...todos.slice(todoIdx + 1, todos.length)
    ])

    playDeleteSound();
  }

  function moveToComplete(id){
    if(!id) return;

    const todoIdx = todos.findIndex(todo => todo.id === id);

    if(todoIdx < 0) return;

    setTodos([
      ...todos.slice(0, todoIdx),
      {
        ...todos[todoIdx],
        status: todoStatus.completed
      },
      ...todos.slice(todoIdx + 1, todos.length)
    ])

    playCompletedSound()
  }

  return <TodosContext.Provider value={{
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    moveToComplete
  }}>
    <h1>Todos</h1>
    <AddTodoCta/>
    <div>
      {
        pending.map((todo, index) => <Todo key={index} {...todo}/>)
      }
    </div>
  </TodosContext.Provider>
}
