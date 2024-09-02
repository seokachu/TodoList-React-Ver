import { ChangeEvent, useEffect, useState } from "react";
import { useConnectActions, useTodos } from "../../store/connect-store";
import useDebounce from "../../utils/useSearchDebounce";
import { Todo } from "../../types";

const Search = () => {
  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(search, 500);
  const todos = useTodos();
  const { setTodos } = useConnectActions();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      return;
    }

    const filteredKeyword = todos.filter((item) =>
      item.content.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    setFilteredTodos(filteredKeyword);
  }, [todos, debouncedValue]);

  //상태 업데이트가 실제로 변화가 있을때 업데이트
  useEffect(() => {
    setTodos(filteredTodos);
  }, [filteredTodos, setTodos]);

  return (
    <div className="search-wrapper">
      <form>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={search}
          onChange={handleSearch}
        />
      </form>
    </div>
  );
};

export default Search;
