import { shallowMount } from "@vue/test-utils";
import InputText from "primevue/inputtext";
import { describe, expect, it, vi } from "vitest";
import InputButton from "./inputButton.vue";

describe("InputButton", () => {
  let wrapper: any;

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

  it("renders the component correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders props correctly", () => {
    expect(wrapper.props().modelValue).toBe("");
    expect(wrapper.props().placeholder).toBe("Enter username");
    expect(wrapper.props().label).toBe("Submit");
    expect(wrapper.props().class).toBe("custom-class");
    expect(wrapper.props().ariaDescribedby).toBe("description");
  });

  it("emits an update event when input value changes", async () => {
    const input = wrapper.findComponent(InputText);
    const newValue = "Todo List";
    await input.setValue(newValue);
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(newValue);
  });

  it("calls handleActions method when the button is clicked", () => {
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.handleActions).toHaveBeenCalled();
  });
});
