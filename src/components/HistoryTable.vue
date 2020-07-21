<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Table_Col_Summ' | localize }}</th>
        <th>{{ 'Table_Col_Date' | localize }}</th>
        <th>{{ 'Table_Col_Category' | localize }}</th>
        <th>{{ 'Table_Col_Type' | localize }}</th>
        <th>{{ 'Table_Col_Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx +1 }}</td>
        <td>{{ record.amount | currency('UAH') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{record.typeText | localize}}</span>
        </td>
        <td>
          <button
            :key="locale"
            v-tooltip="reviewRecord"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  data: () => ({
    reviewRecord: localizeFilter("Review_Record")
  }),
  computed: {
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    locale() {
      this.reviewRecord = localizeFilter("Review_Record");
    }
  },
  props: {
    records: {
      required: true,
      type: Array
    }
  }
};
</script>