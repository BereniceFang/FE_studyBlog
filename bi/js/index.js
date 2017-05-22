$('#permeability-bar').on('click', function (params) {
    var data = {
        type: category[params.dataIndex]
    }
    linkChart = $('#permeability-bar').attr('link-dom')
    var tmpDom = $("#"+linkChart).get(0)
    var myChart = echarts.init(tmpDom)
    var url = $(tmpDom).attr('data-url')
    getChinaMapData(myChart, url, data)
})


