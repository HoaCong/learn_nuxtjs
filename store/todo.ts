import { defineStore } from "pinia";
import todoObject from "type/todo-type";

export const todoStore = defineStore("todoStore", {
  state: () => ({
    newTodo: { id: "", name: "", status: false } as todoObject,
    list: [] as Array<todoObject>,
  }),

  actions: {
    saveStorage() {
      localStorage.setItem("todos", JSON.stringify(this.list));
    },
    addOrUpTodo(name: string) {
      const isExist = this.list.findIndex((item) => item.name === name) !== -1;

      if (name.trim() === "") return alert("Tên task không được trống");

      if (isExist) return alert("Task này đã tồn tại");

      let newData = {
        id: Date.now(),
        name: name,
        status: false,
      } as todoObject;

      if (this.newTodo.id !== "") {
        this.list = this.list.map((todo) =>
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

      this.newTodo = { id: "", name: "", status: false };
    },

    removeTodo(todoId: number) {
      this.list = this.list.filter((todo) => todo.id !== todoId);
    },

    editTodo(item: todoObject) {
      console.log("item:", item);
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
