<template>
  <div
    class="w-28rem m-auto border-solid border-1 border-800 border-round-md p-3 mt-5"
  >
    <h1 class="text-center mt-2 mb-2">Todo List</h1>

    <!-- <div class="mb-4">
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
        :handleActions="handleAddOrEdit"
        :label="newTodo.id !== '' ? 'Edit' : 'Add'"
        :class="{ 'w-full': true, 'p-invalid': error.status }"
        ariaDescribedby="text-error"
      />
      <small class="p-error" id="text-error">{{ error.message }}</small>
    </div> -->

    <div class="mb-4">
      <div class="flex justify-content-between">
        <span class="p-float-label flex-grow-1">
          <InputText class="w-full" v-model="keyword" placeholder="Keyword" />
          <label>Keyword</label>
        </span>

        <Button label="Search" @click="searchTodo(keyword)" />
      </div>
    </div>

    <div class="mb-4">
      <div class="flex justify-content-between">
        <span class="p-float-label flex-grow-1 p-input-icon-right">
          <i class="pi pi-refresh" id="refresh" @click="handleRefresh()" />
          <InputText
            class="w-full"
            :class="{ 'p-invalid': error.status }"
            v-model="newTodo.name"
            aria-describedby="text-error"
            placeholder="Name task"
          />
          <label>Name task</label>
        </span>

        <Button
          :severity="newTodo.id !== '' && 'warning'"
          :label="newTodo.id !== '' ? 'Edit' : 'Add'"
          @click="handleAddOrEdit(value)"
        />
      </div>
      <small class="p-error" id="text-error">{{ error.message }}</small>
    </div>

    <hr class="mb-3" />
    <div v-if="pending" class="text-center">
      <div class="card flex justify-content-center">
        <ProgressSpinner
          class="w-5rem h-5rem"
          strokeWidth="5"
          animationDuration=".5s"
          aria-label="ProgressSpinner"
        />
      </div>
    </div>
    <div v-else-if="isEmptyData || listTodo.length === 0" class="text-center">
      Không có dữ liệu
    </div>
    <div v-else>
      <!-- ACTIONS FOR ALL -->
      <div class="flex justify-content-between align-items-center">
        <label
          class="p-2 border-round-md hover:surface-500 transition-colors transition-duration-150"
        >
          <input
            class="flex justify-content-center align-items-center w-0 h-0 p-3 transition-colors transition-duration-150"
            type="checkbox"
            v-model="isCheckedAll"
            @change="handleCheckAll($event)"
            id="check-all"
          />
        </label>
        <div class="flex justify-content-between align-items-center">
          <Button
            icon="pi pi-check"
            rounded
            @click="handleDoneAll()"
            severity="success"
            id="done-all"
          />
          <Button
            class="ml-2"
            icon="pi pi-trash"
            rounded
            @click="handleRemoveAll()"
            severity="danger"
            id="remove-all"
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
          <!-- ACTIONS element -->
          <div>
            <Button
              icon="pi pi-check"
              rounded
              @click="handleDone(todo.id)"
              :disabled="todo.status"
              severity="success"
              data-label="btnDone"
            />
            <Button
              class="ml-2"
              icon="pi pi-file-edit"
              rounded
              @click="handleEdit(todo)"
              :disabled="todo.status"
              data-label="btnEdit"
              severity="warning"
            />
            <Button
              class="ml-2"
              icon="pi pi-trash"
              rounded
              @click="handleRemove(todo.id)"
              severity="danger"
              data-label="btnRemove"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import InputButton from "./inputButton.vue";
import InputText from "primevue/inputtext";
import { defineComponent } from "vue";
import { todoStore } from "../store";
import { getListTodo } from "../utils";

export default defineComponent({
  data() {
    return {
      pending: true,
      keyword: "",
      listSearch: [],
      listId: [],
      isEmptyData: false,
      isSubmit: false,
      error: { status: false, value: "", message: "" },
    };
  },
  components: { InputText },
  emits: {},
  props: {},
  beforeUpdate() {
    if (this.isSubmit && this.newTodo.name === this.error.value) {
      if (this.newTodo.name === "") {
        this.error = {
          ...this.error,
          status: true,
          message: "Tên task không được trống",
        };
      } else {
        this.error = {
          ...this.error,
          status: true,
          message: "Task này đã tồn tại",
        };
      }
    } else {
      this.error = { ...this.error, status: false, message: "" };
    }
  },
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
      "refresh",
    ]),
    searchTodo(name) {
      const tmp = [...this.list].filter((todo) =>
        todo.name.toLowerCase().includes(name.toLowerCase())
      );
      this.isEmptyData = tmp.length === 0;
      this.listSearch = tmp;
      this.listId = [];
      this.isSubmit = false;
    },
    handleAddOrEdit() {
      this.listSearch = [];
      this.isSubmit = true;
      this.isEmptyData = false;
      const result = this.addOrUpTodo(this.newTodo.name);
      const tmp = this.newTodo.name;
      this.error = {
        status: result !== "",
        value: tmp,
        message: result,
      };
      this.keyword = "";
      if (result === "") this.isSubmit = false;
    },
    handleEdit(id) {
      this.error = {
        status: false,
        value: "",
        message: "",
      };
      this.isSubmit = false;
      this.editTodo(id);
    },
    handleRemove(id) {
      this.removeTodo(id);
      this.listId = this.listId.filter((item) => item !== id);
      const tmp = this.listSearch.filter((item) => item.id !== id);
      this.listSearch = tmp;
      this.isEmptyData = tmp.length === 0;
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
    handleRefresh() {
      this.error = {
        status: false,
        value: "",
        message: "",
      };
      this.isSubmit = false;
      this.refresh();
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
