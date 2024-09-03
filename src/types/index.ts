import { Dispatch, SetStateAction } from "react";

export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}

export interface TodoProps {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export interface TodoListProps {
  title: string;
  todos: Todo[];
}

export interface TodoItem {
  item: Todo;
}

export interface ConnectState {
  todos: Todo[];
  filteredTodos: Todo[];
  actions: {
    setTodos: (todos: Todo[]) => void;
    setFilteredTodos: (item: Todo[]) => void;
  };
}
