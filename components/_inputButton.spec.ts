import { shallowMount } from "@vue/test-utils";
import InputText from "primevue/inputtext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import InputButton from "./inputButton.vue";

describe("InputButton", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(InputButton, {
      propsData: {
        modelValue: "",
        placeholder: "Enter username",
        label: "Submit",
        class: "custom-class",
        handleActions: vi.fn(),
        ariaDescribedby: "description",
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Hiển thị đúng component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Render đúng props", () => {
    expect(wrapper.props().modelValue).toBe("");
    expect(wrapper.props().placeholder).toBe("Enter username");
    expect(wrapper.props().label).toBe("Submit");
    expect(wrapper.props().class).toBe("custom-class");
    expect(wrapper.props().ariaDescribedby).toBe("description");
  });

  it("Phát Emits khi value thay đổi", async () => {
    const input = wrapper.findComponent(InputText);
    const newValue = "Todo List";
    await input.setValue(newValue);
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(newValue);
  });

  it("gọi handleActions khi nhấn button", () => {
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.handleActions).toHaveBeenCalled();
  });
});
