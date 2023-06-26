<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTodo.name" type="text" placeholder="Add a new todo" />
    <button @click="addOrUpTodo(newTodo.name)">Add</button>
    <div>
      <ul>
        <li v-for="todo in list" v-bind:key="todo.id">
          <del v-if="todo?.status">{{ todo?.name }}</del>
          <span v-else>{{ todo?.name }}</span>
          <button @click="doneTodo(todo.id)" :disabled="todo?.status">
            Done
          </button>
          <button @click="editTodo(todo)" :disabled="todo.status">Edit</button>
          <button @click="removeTodo(todo.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { todoStore } from "../store/todo";

export default defineComponent({
  // type inference enabled
  data() {
    return {};
  },
  emits: {},
  props: {},
  mounted() {},
  computed: {
    ...mapState(todoStore, ["list", "newTodo"]),
    // ...mapWritableState(),
    makeSomeThing() {
      return this.newTodo.name;
    },
  },
  methods: {
    ...mapActions(todoStore, [
      "addOrUpTodo",
      "removeTodo",
      "editTodo",
      "doneTodo",
    ]),
    doSomeThing() {
      console.log(123);
    },
  },
});
</script>
