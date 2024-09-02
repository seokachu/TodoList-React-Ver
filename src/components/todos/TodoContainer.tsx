import { useQuery } from "@tanstack/react-query";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTodos } from "../../api/todos";
import Loading from "../layout/Loading";

const TodoContainer = () => {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <div>에러가 발생했습니다.{query.isError}</div>;
  }

  const workingTodos = query?.data?.filter((todos) => !todos.isDone) ?? [];
  const doneTodos = query?.data?.filter((todos) => todos.isDone) ?? [];

  return (
    <main>
      <TodoForm />
      <TodoList title="Working" todos={workingTodos} />
      <TodoList title="Done" todos={doneTodos} />
    </main>
  );
};

export default TodoContainer;
