import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FooterVue from "./Footer.vue";

describe("Footer", () => {
  it("Correct text", () => {
    const wrapper = mount(FooterVue);
    expect(wrapper.text()).toContain("Footer");
  });
});
