import { createApp } from "vue";
import { createPinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import TodoList from "./listTodo.vue";
import InputButton from "./inputButton.vue";
import App from "../app.vue";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import ProgressSpinner from "primevue/progressspinner";

describe("TodoList", () => {
  let app: any;
  let wrapper: any;

  beforeEach(() => {
    app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
    wrapper = shallowMount(TodoList, {
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
      global: {
        plugins: [app],
        components: {
          InputButton,
          ProgressSpinner,
        },
      },
    });
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the "Todo List" title', () => {
    expect(wrapper.find("h1").text()).toBe("Todo List");
  });

  it("renders InputButton component correctly", () => {
    expect(wrapper.findComponent(InputButton).exists()).toBe(true);
  });

  it("renders spinner when pending is true", async () => {
    wrapper.setData({ pending: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ProgressSpinner).exists()).toBe(true);
  });

  it('renders "Không có dữ liệu" when pending is false', () => {
    expect(wrapper.findComponent(ProgressSpinner).exists()).toBe(false);
    expect(wrapper.text()).toContain("Không có dữ liệu");
  });
});
