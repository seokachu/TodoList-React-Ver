import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useId, useState } from "react";
import { Todo } from "../../types";
import { createTodos } from "../../api/todos";
import { toast } from "react-toastify";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const id = useId();
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const createTodo = useMutation({
    mutationFn: (todo: Todo) => createTodos(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (e.target.value !== "") {
      setContentError("");
    }
  };

  //작성 form
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content?.trim()) {
      setContentError("내용을 입력해 주세요.");
    }

    if (content) {
      const nextTodo = {
        id: crypto.randomUUID(),
        content,
        isDone: false,
      };
      createTodo.mutate(nextTodo);
      setContent("");
      setContentError("");
      toast.success("할일이 등록되었습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="form-wrapper">
        <div>
          <label htmlFor={`${id}-content`}>
            <input
              type="text"
              placeholder="새로운 Todo..."
              name="content"
              id={`${id}-content`}
              autoFocus
              value={content}
              onChange={handleContent}
            />
          </label>
          <p>{contentError}</p>
        </div>
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default TodoForm;
