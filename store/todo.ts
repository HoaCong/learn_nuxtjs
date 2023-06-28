import { defineStore } from "pinia";
import { todoObject } from "../types";

export const todoStore = defineStore("todoStore", {
  state: () => ({
    newTodo: { id: "", name: "", status: false } as todoObject,
    list: [] as Array<todoObject>,
  }),

  actions: {
    saveStorage() {
      localStorage.setItem("todos", JSON.stringify(this.list));
    },
    initialList(tmpList: Array<todoObject>) {
      this.list = tmpList;
    },
    addOrUpTodo(name: string) {
      const isExist = this.list.findIndex(
        (item: todoObject) => item.name === name
      );

      if (name.trim() === "") return "Tên task không được trống";

      if (isExist !== -1 && this.list[isExist].id !== this.newTodo.id)
        return "Task này đã tồn tại";

      let newData = {
        id: Date.now(),
        name: name,
        status: false,
      } as todoObject;

      if (this.newTodo.id !== "") {
        this.list = this.list.map((todo: todoObject) =>
          todo.id === this.newTodo.id
            ? {
                ...todo,
                name,
              }
            : todo
        );
      } else {
        this.list.push(newData);
      }
      this.saveStorage();
      this.newTodo = { id: "", name: "", status: false };
      return "";
    },

    removeTodo(todoId: number) {
      this.list = this.list.filter((todo: todoObject) => todo.id !== todoId);
      this.saveStorage();
    },

    editTodo(item: todoObject) {
      this.newTodo = { ...item };
    },

    doneTodo(id: number) {
      this.list = this.list.map((todo: todoObject) =>
        todo.id === id
          ? {
              ...todo,
              status: true,
            }
          : todo
      );
      this.saveStorage();
    },
    doneAll(tmpList: Array<number>) {
      this.list = this.list.map((todo: todoObject) =>
        tmpList.includes(todo.id)
          ? {
              ...todo,
              status: true,
            }
          : todo
      );
      this.saveStorage();
    },
    removeAll(tmpList: Array<number>) {
      this.list = this.list.filter(
        (todo: todoObject) => !tmpList.includes(todo.id)
      );
      this.saveStorage();
    },
  },
});
