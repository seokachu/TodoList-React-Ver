import { create } from "zustand";
import { ConnectState, Todo } from "../types";

const useConnectStore = create<ConnectState>((set) => ({
  todos: [],
  actions: {
    setTodos: (update: (prev: Todo[]) => Todo[]) =>
      set((state) => ({ todos: update(state.todos) })),
  },
}));

export const useTodos = () => useConnectStore((state) => state.todos);
export const useConnectActions = () =>
  useConnectStore((state) => state.actions);
