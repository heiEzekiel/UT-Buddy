import { Doughnut, mixins } from 'vue-chartjs';

export default{
  name: 'doughnut-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props:{
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => ['rgba(72,72,176,0.2)', 'rgba(72,72,176,0.0)', 'rgba(119,52,169,0)'],
      validator: val => {
        return val.length > 2;
      }
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: val => {
        return val.length > 2;
      }
    }
  },
  data() {
    return {
      ctx: null
    };
  },
  methods: {
    updateGradients(chartData) {
      if(!chartData) return;
    }
  },
  mounted() {
    this.$watch('chartData', (newVal, oldVal) => {
      this.updateGradients(this.chartData);
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.extraOptions
        );
      }
    }, { immediate: true });
  }
};