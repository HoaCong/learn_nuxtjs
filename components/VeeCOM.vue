<template>
  <Form @submit="submit" :validation-schema="schema">
    <div>
      <Field name="username" type="username" />
      <ErrorMessage name="username" />
    </div>

    <div>
      <Field name="password" type="password" />
      <ErrorMessage name="password" />
    </div>

    <button type="submit">Submit</button>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  setup() {
    const schema = yup.object({
      username: yup.string().required(),
      password: yup
        .string()
        .required("vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    });

    return {
      schema,
    };
  },
  components: { Field, Form, ErrorMessage },
};
</script>
