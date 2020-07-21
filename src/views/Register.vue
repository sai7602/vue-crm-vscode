<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'HomeAccounting' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{ 'MsgNotEmptyEmail' | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{ 'MsgEmail' | localize }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ 'MsgEntPassw' | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль не можу бути менше {{ $v.password.$params.minLength.min }}.
          Зараз довжина паролю {{ password.length }} символів</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        />
        <label for="name">Ім'я</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Поле
          <b>Ім'я</b> повинно бути заповнене
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model.trim="agree" />
          <span>З правилами погоджуюсь</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Реєстрація
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Вже є аккаунт?
        <router-link to="/login">Вхід!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  metaInfo() {
    return { title: this.$title('Registration') };
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checkbox: (value) => value },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (error) {}
    },
  },
};
</script>
