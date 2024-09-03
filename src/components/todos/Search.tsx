import { ChangeEvent, useEffect, useState } from "react";
import { useConnectActions, useTodos } from "../../store/connect-store";
import useDebounce from "../../hooks/useSearchDebounce";

const Search = () => {
  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(search, 500);
  const todos = useTodos();
  const { setFilteredTodos } = useConnectActions();

  useEffect(() => {
    const filteredKeyword = todos.filter((item) =>
      item.content.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredTodos(filteredKeyword);
  }, [debouncedValue, setFilteredTodos, todos]);

  const handlerSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handlerSearch}>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
