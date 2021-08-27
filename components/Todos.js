import {createContext, useContext, useState} from "react";
import Todo from "./Todo";
import AddTodoCta from "./AddTodo/AddTodoCta";
import {getFancyGradient} from "../utils";

const TodosContext = createContext({})

export function useTodosContext(){
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodosContext must be used within a TodosContextProvider')
  }
  return context
}

export default function Todos() {
  const [todos, setTodos] = useState([]);
  return <TodosContext.Provider value={{
    todos,
    setTodos,
    addTodo: (todo) => {
      todo && setTodos([{
        name: todo,
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
