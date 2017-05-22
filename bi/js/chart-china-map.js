var data, url, name, min, max
var tmpOption = []
var optObj = {
    name: name,
    type: 'map',
    mapType: 'china',
    roam: false,
    label: {
        normal: {
            show: true
        },
        emphasis: {
            show: true
        }
    },
    data: data
}
var chinaMapOption = {
    tooltip: {
        trigger: 'item'
    },
    visualMap: {
        min: min,
        max: max,
        padding: 15,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true
    },
    series: tmpOption
}
$("div[chart-type='china-map']").each(function(i, a){
    var myChart = echarts.init($(a).get(0))
    url = $(a).attr('data-url')
    getChinaMapData(myChart, url)
})
function getChinaMapData(myChart, url, data){
    $.ajax({
        url: url,
        cache: false,
        type: 'get',
        data: data,
        // data: this.opt.ajaxData,
        dataType: 'json',
        success: function(json) {
            if (json.success) {
                data = json.result.data
                tmpOption.length = 0
                for(var x in data){
                    var obj = deepCopy(optObj)
                    obj.data = data[x].data
                    obj.name = data[x].name
                    tmpOption.push(obj)
                }
                chinaMapOption.visualMap.min = json.result.min
                chinaMapOption.visualMap.max = json.result.max
                myChart.setOption(chinaMapOption)
            } else {
               console.log(json.success)
            }
        },
        error:  function(XMLHttpRequest, textStatus, errorThrown){  
            console.log("XMLHttpRequest.readyState" +XMLHttpRequest.readyState + "XMLHttpRequest.status" + XMLHttpRequest.status + XMLHttpRequest.responseText);  
        }  
    })
}
function deepCopy(source) { 
    var result={}
    for (var key in source) {
          result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key]
       } 
   return result
}

