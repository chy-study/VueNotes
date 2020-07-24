<template>
  <div class="Echarts" style="margin-top: 50px">
    <div id="histogram" style="width: 49%; height:400px; float: left"></div>
    <div id="pieChart" style="width: 49%; height:400px; float: left"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  methods:{
	  histograms(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('histogram'));

		  // 指定图表的配置项和数据
		  var option = {
			  title: {
				  text: '柱状图',
				  left: 'center'
			  },
			  tooltip: {
			  	show: true,
			    feature: {
			      dataZoom: {
			        yAxisIndex: "none"
			      },
			      dataView: {
			        readOnly: false
			      },
			      magicType: {
			        type: ["line", "bar"]
			      },
			      restore: {},
			      saveAsImage: {}
			  	}
			  },
			  legend: {
				  data:['销量','价格'],
				  left: 'right'
			  },
			  xAxis: {
				  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {},
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]			
			  },
			  {
				  name: '价格',
				  type: 'bar',
				  data: [12, 30, 10, 19, 19, 9]
			  }]
		  };

		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  },

		pieCharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('pieChart'));

		  // 指定图表的配置项和数据
		  var option = {
			    title: {
			        text: '饼状图',
			        subtext: '纯属虚构',
			        left: 'center'
			    },
			    tooltip: {
			        trigger: 'item',
			        formatter: '{a} <br/>{b} : {c} ({d}%)'
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'right',
			        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
			    },
			    series: [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius: '55%',
			            center: ['50%', '60%'],
			            data: [
			                {value: 335, name: '直接访问'},
			                {value: 310, name: '邮件营销'},
			                {value: 234, name: '联盟广告'},
			                {value: 135, name: '视频广告'},
			                {value: 1548, name: '搜索引擎'}
			            ],
			            emphasis: {
			                itemStyle: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  }
  },
  mounted() {
  	this.histograms();
  	this.pieCharts();
  }
}
</script>