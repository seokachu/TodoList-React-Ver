import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoItem } from "../../types";
import { deleteTodos, patchTodos } from "../../api/todos";
import { toast } from "react-toastify";

const TodoItems = ({ item }: TodoItem) => {
  const { id, content, isDone } = item;
  const queryClient = useQueryClient();

  //삭제
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => deleteTodos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  //취소,확인
  const { mutate: toggleMutate } = useMutation({
    mutationFn: async (id: string) =>
      await patchTodos(id, {
        id,
        content,
        isDone: !isDone,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  //삭제 버튼
  const onClickDeleteTodo = () => {
    if (window.confirm("정말로 삭제 하시겠습니까?")) {
      deleteMutate(id);
      toast.success("삭제가 완료 되었습니다.");
    } else {
      toast.warning("삭제가 취소 되었습니다.");
    }
  };

  //취소, 확인 버튼
  const onClickToggle = () => {
    toggleMutate(id);
    toast(
      isDone
        ? "할일이 미완료 처리로 이동했습니다."
        : "할일이 완료 처리로 이동했습니다."
    );
  };

  return (
    <div className="todo-list">
      <div>
        <p>{content}</p>
      </div>
      <div className="todo-list-button">
        <button onClick={onClickDeleteTodo}>삭제</button>
        <button onClick={onClickToggle}>{isDone ? "취소" : "완료"}</button>
      </div>
    </div>
  );
};

export default TodoItems;
