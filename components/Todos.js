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
  return <TodosContext.Provider value={{
    todos,
    setTodos,
    addTodo: (todo) => {
      todo && setTodos([{
        name: todo,
        id: generateRandomId(),
        bgColor: getFancyGradient()
      }, ...todos]);
    }
  }}>
    <AddTodoCta/>
    {
      todos.map((todo, index) => <Todo key={index} {...todo}/>)
    }
  </TodosContext.Provider>
}
