import { shallowMount } from "@vue/test-utils";
import InputButton from "./inputButton.vue";
import InputText from "primevue/inputtext";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("InputButton", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(InputButton, {
      propsData: {
        btnId: "add",
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

  it("renders the component correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders props correctly", () => {
    expect(wrapper.props().modelValue).toBe("");
    expect(wrapper.props().placeholder).toBe("Enter username");
    expect(wrapper.props().label).toBe("Submit");
    expect(wrapper.props().class).toBe("custom-class");
    expect(wrapper.props().ariaDescribedby).toBe("description");
    expect(wrapper.props().btnId).toBe("add");
  });

  it("emits an update event when input value changes", async () => {
    const input = wrapper.findComponent(InputText);
    await input.setValue("Hòa Lê");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("Hòa Lê");
  });

  it("calls handleActions method when the button is clicked", () => {
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.handleActions).toHaveBeenCalled();
  });
});
