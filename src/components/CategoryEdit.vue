<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="selectCategory" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <label>{{'CategorySelect' | localize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          />
          <label for="name">{{'CategoryName' | localize}}</label>
          <span class="helper-text invalid">{{'CategoryName' | localize}}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">{{'Limit' | localize}}</label>
          <span class="helper-text invalid">{{'Limit' | localize}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Btn_Update' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter";
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    selectCategory: null,
    title: "",
    limit: 1,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(10) }
  },

  watch: {
    current(value) {
      const { title, limit } = this.categories.find(c => c.id === value);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.selectCategory);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const catData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        const category = await this.$store.dispatch("updateCategory", catData);
        this.$message(localizeFilter("CategoryUPD"));
        this.$emit("updated", catData);
      } catch (error) {}
    }
  }
};
</script>