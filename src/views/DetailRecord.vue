<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          'History' | localize
        }}</router-link>
        <a @click.prevent class="breadcrumb" :key="locale">{{
          record.type === 'income' ? income : outcome
        }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>
                {{ 'MessageDescription' | localize }}: {{ record.description }}
              </p>
              <p>
                {{ 'Table_Col_Summ' | localize }}:
                {{ record.amount | currency('UAH') }}
              </p>
              <p>
                {{ 'Table_Col_Category' | localize }}: {{ record.categoryName }}
              </p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ 'NoSuchRecord' | localize }}</p>
  </div>
</template>
<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  name: 'detailRecord',
  metaInfo() {
    return { title: this.$title('PageDetailRecord') };
  },
  data: () => ({
    record: null,
    loading: true,
    income: localizeFilter('recordTypeTextIncome'),
    outcome: localizeFilter('recordTypeTextOutcome'),
  }),
  computed: {
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    locale() {
      this.income = localizeFilter('recordTypeTextIncome');
      this.outcome = localizeFilter('recordTypeTextOutcome');
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
