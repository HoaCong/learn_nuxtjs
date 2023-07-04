import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "vue";
import App from "../app.vue";
import InputButton from "./inputButton.vue";
import TodoList from "./listTodo.vue";
import InputText from "primevue/inputtext";
import { todoObject } from "types";

describe("TodoList khởi tạo với 2 phần tử ở localStorage", () => {
  let app: any;
  let wrapper: any;
  const listMock = [
    { id: 1, name: "Task 1", status: false },
    { id: 2, name: "Task 2", status: true },
  ];

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

  it("Hiển thị đúng component", () => {
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

  it("Hiển thị ProgressSpinner khi pending: true", async () => {
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

  it("Search 'Task 1'", async () => {
    const inputSearch = wrapper.findComponent('[placeholder="Keyword"]');
    const btnSearch = wrapper.find('[label="Search"]');
    inputSearch.setValue("Task 1");
    btnSearch.trigger("click");
    const dataSearch = [
      {
        id: 1,
        name: "Task 1",
        status: false,
      },
    ];
    expect(wrapper.vm.listSearch).toEqual(dataSearch);
    expect(wrapper.vm.listTodo).toEqual(dataSearch);
  });

  it("Search 'nodata'", async () => {
    const inputSearch = wrapper.findComponent('[placeholder="Keyword"]');
    const btnSearch = wrapper.find('[label="Search"]');
    inputSearch.setValue("NoData");
    btnSearch.trigger("click");
    expect(wrapper.vm.listSearch).toEqual([]);
    expect(wrapper.vm.isEmptyData).toBe(true);
  });

  it("Hoàn thành tất cả task todo", async () => {
    wrapper.find("input#check-all").setChecked(true);
    wrapper.find("#done-all").trigger("click");

    wrapper.vm.list.forEach((item: todoObject) => {
      expect(item.status).toBe(true);
    });
  });

  it("Xóa tất cả dữ liệu", async () => {
    expect(wrapper.vm.list).toHaveLength(2);
    wrapper.find("input#check-all").setChecked(true);
    wrapper.find("#remove-all").trigger("click");
    expect(wrapper.vm.list).toHaveLength(0);
  });

  it("Thêm dữ liệu", async () => {
    const inputAdd = wrapper.findComponent('[placeholder="Name task"]');
    const btnAdd = wrapper.find('[label="Add"]');
    const btnRefresh = wrapper.find("#refresh");

    // Trường hợp thêm với empty string
    inputAdd.setValue("");
    btnAdd.trigger("click");
    expect(wrapper.vm.error.message).toBe("Tên task không được trống");
    btnRefresh.trigger("click");
    expect(wrapper.vm.newTodo.id).toBe("");
    expect(wrapper.vm.error.message).toBe("");

    // Trường hợp thêm với empty string
    inputAdd.setValue("Task 1");
    btnAdd.trigger("click");
    expect(wrapper.vm.error.message).toBe("Task này đã tồn tại");
    btnRefresh.trigger("click");
    expect(wrapper.vm.newTodo.id).toBe("");
    expect(wrapper.vm.error.message).toBe("");

    inputAdd.setValue("Task 3");
    btnAdd.trigger("click");
    expect(wrapper.vm.listTodo).toHaveLength(3);
  });

  it("Chỉnh sửa dữ liệu", async () => {
    const inputAdd = wrapper.findComponent('[placeholder="Name task"]');
    const btnEdit = wrapper.find('[label="Edit"]');
    const btnRefresh = wrapper.find("#refresh");

    const listBtnEdit = wrapper.find("[data-label='btnEdit']");
    listBtnEdit.trigger("click");
    await wrapper.vm.$nextTick();

    inputAdd.setValue("");
    btnEdit.trigger("click");
    expect(wrapper.vm.error.message).toBe("Tên task không được trống");
    btnRefresh.trigger("click");
    expect(wrapper.vm.newTodo.id).toBe("");
    expect(wrapper.vm.error.message).toBe("");

    listBtnEdit.trigger("click");
    await wrapper.vm.$nextTick();
    inputAdd.setValue("Task 2");
    btnEdit.trigger("click");
    expect(wrapper.vm.error.message).toBe("Task này đã tồn tại");
    btnRefresh.trigger("click");
    expect(wrapper.vm.newTodo.id).toBe("");
    expect(wrapper.vm.error.message).toBe("");

    listBtnEdit.trigger("click");
    await wrapper.vm.$nextTick();
    inputAdd.setValue("Task 3");
    btnEdit.trigger("click");
    expect(wrapper.vm.listTodo[0].name).toBe("Task 3");
  });

  it("Hoàn thành 1 todo task", async () => {
    const listBtnDone = wrapper.find("[data-label='btnDone']");
    listBtnDone.trigger("click");
    await wrapper.vm.$nextTick();

    const tagDel = wrapper.find(".name-task del");
    expect(tagDel.text()).toBe("Task 1");
    expect(wrapper.vm.listTodo[0].status).toBe(true);
  });

  it("Xóa 1 todo task", async () => {
    const listBtnRemove = wrapper.find("[data-label='btnRemove']");
    listBtnRemove.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.listTodo).toHaveLength(1);
  });
});
