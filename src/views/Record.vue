<template>
  <div>
    <div class="page-title">
      <h3>{{ 'newRecord' | localize }}</h3>
    </div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ 'MessageCategory' | localize }}
      <router-link to="/categories">{{
        'CategoryCreate' | localize
      }}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="selectCategory" v-model="currentCategory">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>{{ 'CategorySelect' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ 'recordTypeTextIncome' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ 'recordTypeTextOutcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{ 'MessageAmount' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{ 'MessageMinValue' | localize }}
          {{ $v.amount.$params.minValue.min | currency('UAH') }}</span
        >
        <span class="helper-text invalid" v-else>{{
          'MessageAmountCosts' | localize
        }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">{{ 'MessageDescription' | localize }}</label>
        <span class="helper-text invalid">{{
          'MessageDescrCosts' | localize
        }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import localizeFilter from '@/filters/localize.filter';
import currencyFilter from '@/filters/currency.filter';
export default {
  name: 'record',
  metaInfo() {
    return { title: this.$title('Page_New_Record') };
  },
  data: () => ({
    loading: false,
    selectCategory: null,
    categories: [],
    currentCategory: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.currentCategory = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.selectCategory);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.currentCategory,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch('updateInfo', { bill });
          this.$message(`${localizeFilter('RecordCreated')}`);
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (error) {}
      } else {
        this.$message(
          `${localizeFilter('NotEnough')} ${currencyFilter(
            this.amount - this.info.bill,
            'UAH'
          )},  
            ${localizeFilter('OnAccount')} ${currencyFilter(
            this.info.bill,
            'UAH'
          )}`
        );
      }
    },
  },
};
</script>
