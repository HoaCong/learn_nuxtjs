import { defineStore } from "pinia";
import todoObject from "type/todo-type";

export const todoStore = defineStore("todoStore", {
  state: () => ({
    newTodo: { id: "", name: "", status: false } as todoObject,
    list: [
      { id: 1, name: "chơi bóng đá", status: false },
      { id: 2, name: "chơi đá bóng", status: false },
    ] as Array<todoObject>,
  }),

  actions: {
    addOrUpTodo(item: string) {
      if (item.trim() !== "") {
        let newData = {
          id: Date.now(),
          name: item,
          status: false,
        } as todoObject;

        if (this.newTodo.id !== "") {
          this.list = this.list.map((todo) =>
            todo.id === this.newTodo.id
              ? {
                  ...todo,
                  name: item,
                }
              : todo
          );
        } else this.list.push(newData);
      }
      this.newTodo = { id: "", name: "", status: false };
    },
    removeTodo(todoId: number) {
      this.list = this.list.filter((todo) => todo.id !== todoId);
    },
    editTodo(item: todoObject) {
      this.newTodo = { ...item };
    },
    doneTodo(id: number) {
      this.list = this.list.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: true,
            }
          : todo
      );
    },
  },
});
