const fillToMax= function(array,amount){
  let toAdd =array[array.length-1]
  copiedArray = array.concat([])
  while(copiedArray.length<amount){
    copiedArray.push(toAdd)
  }
  return copiedArray
}
const { reactiveProp } = VueChartJs.mixins
Vue.component('line-chart', {
  extends: VueChartJs.Line,
  props:['options','chartData'],
  mounted() {
    this.renderLineChart();
  },
  methods:{
    renderLineChart: function () {
      this.renderChart(this.chartData, this.options)
    },
  },
  watch:{
    chartData:function dataHandler(newData, oldData) {
      if (oldData) {
        var chart = this.$data._chart;
        var newDatasetLabels = newData.datasets.map(function (dataset) {
          return dataset.label;
        });
        var oldDatasetLabels = oldData.datasets.map(function (dataset) {
          return dataset.label;
        });
        var oldLabels = JSON.stringify(oldDatasetLabels);
        var newLabels = JSON.stringify(newDatasetLabels);

        if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
          newData.datasets.forEach(function (dataset, i) {
            var oldDatasetKeys = Object.keys(oldData.datasets[i]);
            var newDatasetKeys = Object.keys(dataset);
            var deletionKeys = oldDatasetKeys.filter(function (key) {
              return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
            });
            deletionKeys.forEach(function (deletionKey) {
              delete chart.data.datasets[i][deletionKey];
            });

            for (var attribute in dataset) {
              if (dataset.hasOwnProperty(attribute)) {
                chart.data.datasets[i][attribute] = dataset[attribute];
              }
            }
          });

          if (newData.hasOwnProperty('labels')) {
            chart.data.labels = newData.labels;
            this.$emit('labels:update');
          }

          if (newData.hasOwnProperty('xLabels')) {
            chart.data.xLabels = newData.xLabels;
            this.$emit('xlabels:update');
          }

          if (newData.hasOwnProperty('yLabels')) {
            chart.data.yLabels = newData.yLabels;
            this.$emit('ylabels:update');
          }

          chart.update(0);
          this.$emit('chart:update');
        } else {
          if (chart) {
            chart.destroy();
            this.$emit('chart:destroy');
          }

          this.renderChart(this.chartData, this.options);
          this.$emit('chart:render');
        }
      } else {
        if (this.$data._chart) {
          this.$data._chart.destroy();

          this.$emit('chart:destroy');
        }

        this.renderChart(this.chartData, this.options);
        this.$emit('chart:render');
      }
    }
  }
})
