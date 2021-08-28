import {createContext, useContext, useState} from "react";
import Todo from "./Todo/Todo";
import AddTodoCta from "./AddTodo/AddTodoCta";
import {getFancyGradient} from "../utils";
import generateRandomId from "generate-random-id";

const TodosContext = createContext({})

export function useTodosContext(){
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodosContext must be used within a TodosContextProvider')
  }
  return context
}

export default function Todos() {
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
    bgColor: getFancyGradient()
  })));

  function addTodo(todo){
    todo && setTodos([{
      name: todo,
      id: generateRandomId(),
      bgColor: getFancyGradient()
    }, ...todos]);
  }

  function deleteTodo(id){
    if(!id) return;

    const todoIdx = todos.findIndex(todo => todo.id === id);

    if(todoIdx < 0) return;

    setTodos([
      ...todos.slice(0, todoIdx),
      ...todos.slice(todoIdx + 1, todos.length)
    ])
  }

  return <TodosContext.Provider value={{
    todos,
    setTodos,
    addTodo,
    deleteTodo
  }}>
    <AddTodoCta/>
    {
      todos.map((todo, index) => <Todo key={index} {...todo}/>)
    }
  </TodosContext.Provider>
}
