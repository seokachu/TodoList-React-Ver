import axios from "axios";
import { Todo } from "../types";

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const todoClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//가져오기
export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await todoClient.get("/todos");
  return data;
};

//추가하기
export const createTodos = async (todo: Todo) => {
  const data = await todoClient.post("/todos", todo);
  return data;
};

//삭제하기
export const deleteTodos = async (id: string) => {
  await todoClient.delete(`/todos/${id}`);
  return id;
};

//수정하기
export const patchTodos = async (id: string, todo: Todo) => {
  await todoClient.put(`/todos/${id}`, todo);
  return id;
};
