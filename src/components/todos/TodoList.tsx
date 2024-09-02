import { TodoListProps } from "../../types";
import TodoItems from "./TodoItems";

const TodoList = ({ title, todos }: TodoListProps) => {
  return (
    <div className="todo-list-wrapper">
      <h2>{title}</h2>
      <ul>
        {todos.length > 0 ? (
          todos.map((item) => (
            <li key={item.id}>
              <TodoItems item={item} />
            </li>
          ))
        ) : (
          <p>내용이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
