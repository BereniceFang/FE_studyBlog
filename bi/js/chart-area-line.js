var data, url, category
var lineOption = {
    tooltip : {
        trigger: 'axis'
    },
    color: ['#fecb85','#fdffc4'],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            // data : [1,2,3,4,5,6,7]
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', ]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'昨日',
            type:'line',
            areaStyle:{
                normal:{
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //   offset: 0, color: '#fdffc4' // 0% 处的颜色
                    // }, {
                    //   offset: 1, color: '#fecb85' // 100% 处的颜色
                    // }], false)
                }
            },
            data:data
        },
        {
            name:'今日',
            type:'line',
            areaStyle:{
                normal:{
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //   offset: 0, color: '#fecb85' // 0% 处的颜色
                    // }, {
                    //   offset: 1, color: '#fff' // 100% 处的颜色
                    // }], false)
                }
            },
            data:data
        }
    ]
}
$("div[chart-type='area-line']").each(function(i, a){
    var myChart = echarts.init($(a).get(0))
    url = $(a).attr('data-url')
    getLineData(myChart, url)
})
function getLineData(myChart, url){
    $.ajax({
        url: url,
        cache: false,
        type: 'get',
        // data: this.opt.ajaxData,
        dataType: 'json',
        success: function(json) {
            if (json.success) {
                data = json.result.data
                if(typeof data[0] == 'object'){
                    for(var x in data){
                        lineOption.series[x].data = data[x]
                    }
                }else{
                    lineOption.series[0].data = data
                }
                myChart.setOption(lineOption)
            } else {
               console.log(json.success)
            }
        },
        error:  function(XMLHttpRequest, textStatus, errorThrown){  
            console.log("XMLHttpRequest.readyState" +XMLHttpRequest.readyState + "XMLHttpRequest.status" + XMLHttpRequest.status + XMLHttpRequest.responseText);  
        }  
    })
}
