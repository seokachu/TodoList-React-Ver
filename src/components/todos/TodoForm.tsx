import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useId, useState } from "react";
import { Todo } from "../../types";
import { createTodos } from "../../api/todos";
import { toast } from "react-toastify";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const id = useId();
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const createTodo = useMutation({
    mutationFn: (todo: Todo) => createTodos(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  //작성 form
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;

    if (!title?.trim()) {
      setTitleError("제목을 입력해 주세요.");
    } else if (e.target.value !== "") {
      setTitleError("");
    }

    if (!content?.trim()) {
      setContentError("내용을 입력해 주세요.");
    } else if (e.target.value !== "") {
      setContentError("");
    }

    if (title && content) {
      const nextTodo = {
        id: crypto.randomUUID(),
        title,
        content,
        isDone: false,
      };
      createTodo.mutate(nextTodo);
      e.target.reset();
      setTitleError("");
      setContentError("");
      toast.success("할일이 등록되었습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor={`${id}-title`}>제목</label>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            autoFocus
            name="title"
            id={`${id}-title`}
          />
          <p>{titleError}</p>
        </div>
        <div>
          <label htmlFor={`${id}-content`}>내용</label>
          <input
            type="text"
            placeholder="내용을 입력해 주세요."
            autoFocus
            name="content"
            id={`${id}-content`}
          />
          <p>{contentError}</p>
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default TodoForm;
