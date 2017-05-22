var data, url, title, assistData, category
var barOption = {
    title: {
        text: title
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    itemStyle:{
      normal:{
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#ff3600' // 0% 处的颜色
          }, {
            offset: 1, color: '#ff9b02' // 100% 处的颜色
          }], false),
      }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type : 'category',
        splitLine: {show:false},
        data : category
    },
    yAxis: {
        type : 'value'
    },
    series: [
        {
            name: '辅助',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: assistData
        },
        {
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data: data
        }
    ]
}
$("div[chart-type='waterfall-bar']").each(function(i, a){
    var myBarChart = echarts.init($(a).get(0))
    url = $(a).attr('data-url')
    getBarData(myBarChart, url)
})
function getBarData(myChart, url){
    $.ajax({
        url: url,
        cache: false,
        type: 'get',
        // data: this.opt.ajaxData,
        dataType: 'json',
        success: function(json) {
            if (json.success) {
                title = json.result.title
                data = json.result.data
                category = json.result.category
                assistData = []
                var tmp = data[0]
                for (var i = 0; i < data.length; i++){
                    if(i == 0){
                        assistData[i] = 0
                    }else{
                        assistData[i] = tmp - data[i]
                        tmp = assistData[i]
                    }
                }
                barOption.title.text = title
                barOption.xAxis.data = category
                barOption.series[0].data = assistData
                barOption.series[1].data = data
                myChart.setOption(barOption)
            } else {
               console.log(json.success)
            }
        },
        error:  function(XMLHttpRequest, textStatus, errorThrown){  
            console.log("XMLHttpRequest.readyState" +XMLHttpRequest.readyState + "XMLHttpRequest.status" + XMLHttpRequest.status + XMLHttpRequest.responseText);  
        }  
    })
}

