const api = require('./api.js');
const store = require('../store.js')

const showToast = value => wx.showToast({
    title: value,
    icon: 'none',
    duration: 2000
})

// const updateRatesTotal =  (that) => {
//     that.store.data.datesBetween.forEach(date => {
//         api.retrieveRates(date).then(res => {
//             that.store.data.ratesTotal += res[that.store.data.roomType.name].rate;
//             that.store.data.choosed.push({
//                 date: date,
//                 rate: res[that.store.data.roomType.name].rate
//             });
//             that.update();
//         })
//     })
// }

const formateDate = dayData => {
    if (dayData.start) {
        var date = new Date(dayData.start);
    } else {
        var date = new Date();
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    var day;

    if (dayData.mark == 'start') {
        day = date.getDate();
    } else if (dayData.mark == 'end') {
        date.setDate(date.getDate() + 1);
        day = date.getDate();
    }

    // const myDate = year + '-' + month + '-' + d;
    if (dayData.mark == 'today') {
        day = date.getDate();
        const myDate = [year, month, day].map(formatNumber).join('-');
        return myDate;
    } else {
        const myDate = [month, day].map(formatNumber).join('-');
        return myDate;
    }
}

// item: 1 -> 01
const formatNumber = item => {
    item = item.toString();
    return item[1] ? item : '0' + item;
}

// 两个日期之间的所有日期
const datesBetween = function(checkInDate, checkOutDate) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var inDate = year + '-' + checkInDate;
    var outDate = year + '-' + checkOutDate;
    var start = new Date(inDate);
    var end = new Date(outDate);

    function getDates(stopDate) {
        var dateArray = new Array();
        var currentDate = start;
        // 比较两个时间点
        while (currentDate < stopDate) {
            dateArray.push(currentDate)
            currentDate = new Date(myDate.setDate(currentDate.getDate() + 1));
        }
        return dateArray;
    }

    var dateArray = getDates(end);

    var formatDateArray = [];
    dateArray.forEach(item => {
        var formatDate = [item.getMonth() + 1, item.getDate()].map(formatNumber).join('-');
        formatDateArray.push(formatDate);
    })

    return formatDateArray;
    // var total = async function () {
    //   var addedRates = 0;
    //   for (var i; i <= dateArray.length; i++) {
    //     var formatDate = [dateArray[i].getMonth() + 1, dateArray[i].getDate()].map(formatNumber).join('-');
    //     return await api.retriveRates(formatDate).then(res => {
    //       return addedRates += res[arg.name].rate;
    //     })
    //   }
}

module.exports = {
    showToast,
    formateDate,
    datesBetween,
    // updateRatesTotal
}

// 遍历两个日期之间的所有日期
// https://www.cnblogs.com/ziyoublog/p/9342523.html
// https://blog.csdn.net/qq_33599109/article/details/84282360