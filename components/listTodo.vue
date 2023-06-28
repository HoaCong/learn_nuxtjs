<template>
  <div
    class="w-28rem m-auto border-solid border-1 border-800 border-round-md p-3"
  >
    <h1 class="text-center mt-2 mb-2">Todo List</h1>

    <div class="mb-4">
      <InputButton
        v-model="keyword"
        placeholder="Keyword"
        :handleActions="searchTodo"
        label="Search"
        class="w-full"
      />
    </div>

    <div class="mb-4">
      <InputButton
        v-model="newTodo.name"
        placeholder="Name task"
        :handleActions="handleAdd"
        :label="newTodo.id !== '' ? 'Edit' : 'Add'"
        class="w-full"
      />
    </div>

    <hr class="mb-3" />
    <div v-if="pending" class="text-center">
      <ProgressSpinner class="w-5rem h-5rem" />
    </div>
    <div v-else-if="isEmpty || listTodo.length === 0">Không có dữ liệu</div>
    <div v-else>
      <div class="flex justify-content-between align-items-center">
        <label
          class="p-2 border-round-md hover:surface-500 transition-colors transition-duration-150"
        >
          <input
            class="flex justify-content-center align-items-center w-0 h-0 p-3 transition-colors transition-duration-150"
            type="checkbox"
            v-model="isCheckedAll"
            @change="handleCheckAll($event)"
          />
        </label>
        <div class="flex justify-content-between align-items-center">
          <Button
            icon="pi pi-check"
            rounded
            @click="handleDoneAll()"
            severity="success"
          />
          <Button
            class="ml-2"
            icon="pi pi-trash"
            rounded
            @click="handleRemoveAll()"
            severity="danger"
          />
        </div>
      </div>
      <hr class="mt-3 mb-3" />
      <ul>
        <li
          class="flex justify-content-between align-items-center hover:surface-300 p-2 transition-colors transition-duration-200 border-round-md"
          v-for="todo in listTodo"
          v-bind:key="todo.id"
        >
          <label class="name-task cursor-pointer">
            <input
              v-bind:checked="listId.includes(todo.id)"
              type="checkbox"
              class="mr-2"
              @change="handleCheck(todo.id)"
            />
            <del v-if="todo.status">{{ todo.name }}</del>
            <span v-else>{{ todo.name }}</span>
          </label>
          <div>
            <Button
              icon="pi pi-check"
              rounded
              @click="handleDone(todo.id)"
              :disabled="todo.status"
              severity="success"
            />
            <Button
              class="ml-2"
              icon="pi pi-file-edit"
              rounded
              @click="editTodo(todo)"
              :disabled="todo.status"
              severity="warning"
            />
            <Button
              class="ml-2"
              icon="pi pi-trash"
              rounded
              @click="handleRemove(todo.id)"
              severity="danger"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { todoStore } from "../store";

export default defineComponent({
  // type inference enabled
  data() {
    return {
      pending: true,
      keyword: "",
      listSearch: [],
      listId: [],
      isEmpty: false,
    };
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
      return (
        this.listTodo.every((item) => this.listId.includes(item.id)) &&
        this.listId.length > 0
      );
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
      this.isEmpty = tmp.length === 0;
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
.name-task {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 188.5px);
}
</style>
