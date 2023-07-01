import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "vue";
import App from "../app.vue";
import InputButton from "./inputButton.vue";
import TodoList from "./listTodo.vue";
import InputText from "primevue/inputtext";

describe("TodoList", () => {
  let app: any;
  let wrapper: any;
  const listMock = [
    { id: 1, name: "Task 1", status: false },
    { id: 2, name: "Task 2", status: true },
  ];
  const newTodoMock = {
    id: "",
    name: "",
    status: false,
  };

  beforeEach(() => {
    app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
    vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(
      JSON.stringify(listMock)
    );
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
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Todo List");
    expect(wrapper.find("[label='Search']")).toBeTruthy();
  });

  // it("Two-way binding keyword COM cha -> COM con", async () => {
  //   const inputButton = wrapper.findComponent(InputButton);
  //   const keyword = "New keyword";
  //   await wrapper.setData({ keyword });
  //   await wrapper.vm.$nextTick();
  //   expect(inputButton.props("modelValue")).toBe(keyword);
  // });

  // it("Two-way binding keyword COM con -> COM cha", async () => {
  //   const wrapper = shallowMount(TodoList);
  //   const inputButtonWrapper = wrapper.findComponent(InputButton);
  //   const modelValue = "New model value";
  //   await inputButtonWrapper.vm.$emit("update:modelValue", modelValue);
  //   expect(wrapper.vm.keyword).toBe(modelValue);
  // });

  it("renders spinner when pending is true", async () => {
    wrapper.setData({ pending: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find("[aria-label='ProgressSpinner']").exists()).toBe(true);
  });

  it('renders "Không có dữ liệu" when pending is false, ListTodo = []', async () => {
    wrapper.find("input#check-all").setChecked(true);
    wrapper.find("#remove-all").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Không có dữ liệu");
  });

  it("Thêm giá trị, chọn tất cả và xóa tất cả thì listSearch = []", async () => {
    wrapper.setData({
      listSearch: [{ id: 1, name: "2", status: false }],
    });
    await wrapper.vm.$nextTick();
    wrapper.find("input#check-all").setChecked(true);
    wrapper.find("#remove-all").trigger("click");
    expect(wrapper.vm.listSearch).toHaveLength(0);
    expect(wrapper.vm.listId).toHaveLength(0);
  });

  it('computed property "listTodo" returns correct value when listSearch is empty', async () => {
    const data = wrapper.findAll("button");
    console.log("it  data:", data);
    console.log("demo", wrapper.vm.listSearch, wrapper.vm.isEmptyData);
  });
});
