import vue from "@vitejs/plugin-vue";

export default {
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  collect: ["test/**/*.spec.js", "test/**/*.spec.ts"],
  exclude: ["components/**/*.spec.js", "components/**/*.spec.ts"],
};
