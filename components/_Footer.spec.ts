import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import FooterVue from "./Footer.vue";

describe("YourComponent", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(FooterVue);
    expect(wrapper.vm).toBeTruthy();
  });
});
