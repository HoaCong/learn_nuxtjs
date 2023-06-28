<template>
  <div class="flex justify-content-between">
    <span class="p-float-label flex-grow-1">
      <InputText
        class="w-full"
        id="username"
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label for="username">{{ placeholder }}</label>
    </span>

    <Button :label="label" @click="handleActions(value)" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    handleActions: {
      type: Function,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>
