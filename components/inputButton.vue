<template>
  <div class="flex justify-content-between">
    <span class="p-float-label flex-grow-1">
      <InputText
        class="w-full"
        :class="class"
        id="username"
        v-model="value"
        @input="$emit('update:modelValue', $event.target.value)"
        :aria-describedby="ariaDescribedby"
      />
      <label for="username">{{ placeholder }}</label>
    </span>

    <Button :label="label" @click="handleActions(value)" />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
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
    class: {
      type: String,
    },
    handleActions: {
      type: Function,
    },
    ariaDescribedby: {
      type: String,
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
  components: { InputText },
};
</script>
