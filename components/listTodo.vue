<template>
  <div class="container">
    <h1 class="spacing-2">Todo List</h1>
    <div class="input-wrapper spacing-1">
      <input
        v-model="keyword"
        type="text"
        class="task-input"
        placeholder="Keyword"
      />
      <button @click="searchTodo(keyword)" class="add-button">Search</button>
    </div>
    <div class="input-wrapper spacing-1">
      <input
        v-model="newTodo.name"
        type="text"
        class="task-input"
        placeholder="Add a new task"
      />
      <button @click="handleAdd()" class="add-button">
        {{ newTodo.id !== "" ? "Edit" : "Add" }}
      </button>
    </div>
    <div v-if="pending" class="progress"></div>
    <div v-else class="flex-spacecenter spacing-1">
      <label class="checkbox-all">
        <input
          id="checkbox-all"
          type="checkbox"
          v-model="isCheckedAll"
          @change="handleCheckAll($event)"
        />
      </label>
      <div class="btn-actions">
        <button class="button done-button" @click="handleDoneAll()">
          Done
        </button>
        <button class="button delete-button" @click="handleRemoveAll()">
          Remove
        </button>
      </div>
    </div>
    <ul class="task-list">
      <li class="task-item" v-for="todo in listTodo" v-bind:key="todo.id">
        <label class="name-task">
          <input
            v-bind:checked="listId.includes(todo.id)"
            type="checkbox"
            style="margin-right: 8px"
            @change="handleCheck(todo.id)"
          />
          <del v-if="todo.status">{{ todo.name }}</del>
          <span v-else>{{ todo.name }}</span>
        </label>
        <div class="btn-actions">
          <button
            class="button done-button"
            @click="handleDone(todo.id)"
            :disabled="todo.status"
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
          <button class="button delete-button" @click="handleRemove(todo.id)">
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
    return { pending: true, keyword: "", listSearch: [], listId: [] };
  },
  emits: {},
  props: {},

  mounted() {
    const list =
      this.list.length === 0
        ? getListTodo(JSON.parse(localStorage.getItem("todos")))
        : this.list;
    this.initialList(list);
    this.pending = false;
  },

  computed: {
    ...mapState(todoStore, ["list", "newTodo"]),
    listTodo() {
      return this.listSearch.length > 0 && Array.isArray(this.listSearch)
        ? this.listSearch
        : this.list;
    },
    isCheckedAll() {
      return this.listTodo.every((item) => this.listId.includes(item.id));
    },
  },
  methods: {
    ...mapActions(todoStore, [
      "initialList",
      "addOrUpTodo",
      "doneTodo",
      "editTodo",
      "removeTodo",
      "doneAll",
      "removeAll",
    ]),

    searchTodo(name) {
      const tmp = [...this.list].filter((todo) =>
        todo.name.toLowerCase().includes(name.toLowerCase())
      );
      this.listSearch = tmp;
      this.listId = [];
    },
    handleAdd() {
      this.keyword = "";
      this.listSearch = [];
      this.addOrUpTodo(this.newTodo.name);
    },
    handleRemove(id) {
      this.removeTodo(id);
      this.listId = this.listId.filter((item) => item !== id);
    },
    handleCheckAll(event) {
      this.listId = event.target.checked
        ? this.listTodo.map((item) => item.id)
        : [];
    },
    handleCheck(id) {
      const isExist = this.listId.indexOf(id);
      if (isExist !== -1) this.listId.splice(isExist, 1);
      else this.listId.push(id);
    },
    handleDoneAll() {
      this.doneAll(this.listId);
      this.listSearch = this.listSearch.map((todo) => ({
        ...todo,
        status: this.listId.includes(todo.id),
      }));
    },
    handleDone(id) {
      this.listSearch = this.listSearch.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: true,
            }
          : todo
      );
      this.doneTodo(id);
    },

    handleRemoveAll() {
      this.listSearch = this.listSearch.filter(
        (todo) => !this.listId.includes(todo.id)
      );
      this.removeAll(this.listId);
      this.listId = [];
      this.keyword = "";
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

.spacing-1 {
  margin-bottom: 10px;
}
.spacing-2 {
  margin-bottom: 20px;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.input-wrapper {
  display: flex;
}

.task-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.add-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.add-button:hover {
  background-color: #45a049;
}

.task-list {
  list-style-type: none;
}

.task-item {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-item:hover {
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
  cursor: unset;
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

.checkbox-all {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.checkbox-all:hover {
  background-color: #e7e5e5;
}
.flex-spacecenter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
