<template>
  <div class="container">
    <h1>Todo List</h1>
    <div class="input-wrapper">
      <input
        v-model="newTodo.name"
        type="text"
        id="task-input"
        placeholder="Add a new task"
      />
      <button @click="addOrUpTodo(newTodo.name)" id="add-button">Add</button>
    </div>
    <ul id="task-list">
      <li v-if="pending" class="progress"></li>
      <li v-for="todo in list" v-bind:key="todo.id">
        <p class="name-task">
          <del v-if="todo?.status">{{ todo?.name }}</del>
          <span v-else>{{ todo?.name }}</span>
        </p>
        <div class="btn-actions">
          <button
            class="button done-button"
            @click="doneTodo(todo.id)"
            :disabled="todo?.status"
          >
            Done
          </button>
          <button
            class="button edit-button"
            @click="editTodo(todo)"
            :disabled="todo.status"
          >
            Edit
          </button>
          <button class="button delete-button" @click="removeTodo(todo.id)">
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { todoStore } from "../store";

export default defineComponent({
  // type inference enabled
  data() {
    return { pending: true };
  },
  emits: {},
  props: {},
  mounted() {
    this.pending = false;
  },
  beforeMount() {
    this.initialList(this.getList());
  },
  beforeUnmount() {
    // Lưu dữ liệu vào storage
    console.log("unmounted");
    this.saveStorage();
  },
  computed: {
    ...mapState(todoStore, ["list", "newTodo"]),
    // ...mapWritableState(),
  },
  methods: {
    ...mapActions(todoStore, [
      "initialList",
      "saveStorage",
      "addOrUpTodo",
      "doneTodo",
      "editTodo",
      "removeTodo",
    ]),
    getList() {
      const tmpList =
        this.list.length === 0
          ? getListTodo(JSON.parse(localStorage.getItem("todos")))
          : this.list;
      return tmpList;
    },
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 400px;
  margin: 30px auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.input-wrapper {
  display: flex;
}

#task-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

#add-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

#add-button:hover {
  background-color: #45a049;
}

ul {
  margin-top: 20px;
  list-style-type: none;
}

li {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background-color: #d3d3d3;
  transition: color 0.5s ease-in-out;
}

li:last-child {
  margin-bottom: 0;
}

.name-task {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 188.5px);
}

.button {
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 8px;
}

.button:disabled {
  background-color: rgb(153, 153, 153);
}

.button:disabled:hover {
  background-color: rgb(153, 153, 153);
}

.done-button {
  background-color: #4caf50;
}

.done-button:hover {
  background-color: #4caf50;
}

.edit-button {
  background-color: rgb(175, 175, 175);
}
.edit-button:hover {
  background-color: #959595;
}

.delete-button {
  background-color: #f43628;
}

.delete-button:hover {
  background-color: #d72020;
}

.progress {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #888;
  animation: spin 1s linear infinite;
  margin: 32px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
