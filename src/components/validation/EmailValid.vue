<template>
  <div class="input-field">
    <input id="email" type="text" />
    <label for="email">Email</label>
    <small
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
    >Поле Email не повинно бути пустим</small>
    <small
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
    >Введіть коректний Email</small>
  </div>
</template>


 <script>
// console.log('test');

import { email, required, minLength } from "vuelidate/lib/validators";
// // console.log($v);
export default {
  name: "login",
  data: () => ({
    email: ""
    // password: ""
  }),
  validations: {
    email: { email, required }
    // password: { required, minLength: minLength(6) }
  },

  methods: {
    submitHandler() {
      console.log(this.$v.email);

      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email
        // password: this.password
      };
      console.log(formData);

      this.$router.push("/");
    }
  }
};
</script>
