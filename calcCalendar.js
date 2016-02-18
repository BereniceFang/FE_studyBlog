//计算日历自动补全前后的日期
function calcCalender(startTime) {
    //start, end是日历格的第一个和最后一个
    var start = new Date(startTime.getFullYear(), startTime.getMonth(), 1)
    var end = new Date(startTime.getFullYear(), startTime.getMonth() + 1, 0)
    start.setDate(1 - start.getDay())
    end.setDate(end.getDate() - end.getDay() + 6)
        //日历一共展示多少个天
    var calendarLength = (end - start) / (24 * 60 * 60 * 1000) + 1
    console.log((end - start) / (24 * 60 * 60 * 1000) + 1)
    return [start, end, calendarLength]
}
