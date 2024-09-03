import { create } from "zustand";
import { ConnectState, Todo } from "../types";

const useConnectStore = create<ConnectState>((set) => ({
  todos: [],
  filteredTodos: [],
  actions: {
    setTodos: (todos: Todo[]) => set({ todos }),
    setFilteredTodos: (item: Todo[]) => set({ filteredTodos: item }),
  },
}));

export const useTodos = () => useConnectStore((state) => state.todos);
export const useFilteredTodos = () =>
  useConnectStore((state) => state.filteredTodos);
export const useConnectActions = () =>
  useConnectStore((state) => state.actions);
