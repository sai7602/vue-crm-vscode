<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <div class="row">
          <span class="date black-text col s12">{{ date | date('date') }}</span>
          <span class="date black-text col s12">{{ date | date('time') }}</span>
        </div>
      </div>
      <div class="navbar-left">
        <div class="input-field col s12">
          <select
            ref="selectLanguage"
            class="icons"
            v-model="localeLanguage"
            @change.prevent="changeLanguage"
          >
            <option
              v-for="lang in languages"
              :key="lang.id"
              :value="lang.value"
              :data-icon="lang.dataIcon"
            >{{lang.lang}}</option>
          </select>
        </div>
        <ul class="right hide-on-small-and-down col s12">
          <li>
            <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>
                  {{'ProfileTitle' | localize}}
                </router-link>
              </li>

              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>
                  {{'Logout' | localize}}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    select: null,
    selected: "",
    languages: [
      {
        lang: "Українська",
        value: "uk-UA",
        dataIcon: require("@/assets/svg/flag-ukraine.svg"),
      },
      {
        lang: "English",
        value: "en-US",
        dataIcon: require("@/assets/svg/flag-uk.svg"),
      },
    ],
  }),
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
    localeLanguage: {
      get() {
        return this.$store.getters.info.locale;
      },
      set() {},
    },
    ...mapGetters(["info"]),
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
    ...mapActions(["updateInfo"]),
    async changeLanguage() {
      try {
        await this.updateInfo({
          locale: this.select.el.value,
        });
      } catch (error) {}
    },
  },
  mounted() {
    this.selected = this.info.locale;
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.select = M.FormSelect.init(this.$refs.selectLanguage);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
