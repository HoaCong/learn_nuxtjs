import { createApp } from "vue";
import { createPinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import TodoList from "./listTodo.vue";
import App from "../app.vue";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
describe("TodoList", () => {
  let app: any;

  beforeEach(() => {
    app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
  });

  it("renders the component correctly", () => {
    const wrapper = shallowMount(TodoList, { global: { plugins: [app] } });

    // Perform your assertions here
    // For example, you can check if the component is rendered correctly:
    expect(wrapper.find("h1").text()).toBe("Todo List");
  });

  // Add more test cases here
});
