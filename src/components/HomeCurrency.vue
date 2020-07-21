<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'ExchangeRate' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Currency' | localize}}</th>
              <th>{{'Rate' | localize}}</th>
              <th>{{ 'Table_Col_Date' | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(3)}}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rates", "date"],
  data: () => ({
    currencies: ["UAH", "USD", "EUR", "RUB"]
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["UAH"] / this.rates["EUR"])
      );
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>