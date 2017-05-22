var color = [['#ffe71b','#ffefb2','#ffef62','#ff6700','#bf3603','ffc107','#e35d03','#d84d22','#ff794e','#ff5722'],['#60afdd','#0051ba','#51bfe2','#93c6e0','#75aadb','#c4d8e2','#82c6e2']]
var data, url
var pieOption = {
    series: [
        {
            type: 'pie',
            radius: ['65%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },

            // 设置扇形的颜色
            color: color,
                    
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data
        }
    ]
}
$("div[chart-type='annular-pie']").each(function(i, a){
    var myChart = echarts.init($(a).get(0))
    url = $(a).attr('data-url')
    getPieData(myChart, url, color[i%2])
})
function getPieData(myChart, url, color){
    $.ajax({
        url: url,
        cache: false,
        type: 'get',
        // data: this.opt.ajaxData,
        dataType: 'json',
        success: function(json) {
            if (json.success) {
                data = json.result.data
                pieOption.series[0].data = data
                pieOption.series[0].color = color
                myChart.setOption(pieOption)
            } else {
               console.log(json.success)
            }
        },
        error:  function(XMLHttpRequest, textStatus, errorThrown){  
            console.log("XMLHttpRequest.readyState" +XMLHttpRequest.readyState + "XMLHttpRequest.status" + XMLHttpRequest.status + XMLHttpRequest.responseText);  
        }  
    })
}

