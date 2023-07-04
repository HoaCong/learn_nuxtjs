import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Header from "./Header.vue";

describe("Header", () => {
  it("Đúng route", async () => {
    const routes = [
      { path: "/", name: "Home" },
      { path: "/about", name: "About" },
      { path: "/todo", name: "Todo" },
    ];
    const router = createRouter({
      history: createWebHistory(),
      routes: routes as RouteRecordRaw[],
    });

    router.push("/about");
    await router.isReady();

    const wrapper = shallowMount(Header, {
      global: {
        plugins: [router],
      },
    });

    const aboutLink = wrapper.find("#about");
    const todoLink = wrapper.find("#todo");

    expect(wrapper.text()).toContain("MENT");
    expect(aboutLink.classes()).toContain("text-blue-500");
    expect(todoLink.classes()).not.toContain("text-blue-500");
    wrapper.unmount();
  });
});
