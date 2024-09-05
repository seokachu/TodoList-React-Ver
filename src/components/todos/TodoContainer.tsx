import { useQuery } from "@tanstack/react-query";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { getTodos } from "../../api/todos";
import NotFoundPage from "../../not-found";
import Loading from "../layout/Loading";
import Today from "./Today";
import Search from "./Search";
import {
  useConnectActions,
  useFilteredTodos,
  useTodos,
} from "../../store/connect-store";

const TodoContainer = () => {
  const todos = useTodos();
  const { setTodos } = useConnectActions();
  const filteredTodos = useFilteredTodos();

  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <NotFoundPage />;
  }

  //검색 데이터
  const allTodos = query?.data ?? [];
  setTodos(allTodos);

  // 필터링된 결과가 없을 경우 원래의 todos 리스트를 사용
  const todosToDisplay = filteredTodos.length > 0 ? filteredTodos : todos;

  // 필터링된 결과나 원래 리스트를 사용하여 작업 및 완료된 할 일 목록을 계산
  const workingTodos = todosToDisplay.filter((todo) => !todo.isDone);
  const doneTodos = todosToDisplay.filter((todo) => todo.isDone);

  return (
    <main className="main">
      <Today />
      <TodoForm />
      <Search />
      <TodoList title="🔥 Working" todos={workingTodos} />
      <TodoList title="✨ Done" todos={doneTodos} />
    </main>
  );
};

export default TodoContainer;
