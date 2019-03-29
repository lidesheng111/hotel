const store = require('./store.js');

App({
    onLaunch: function() {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        this.globalData = {}

        // updateRatesTotal = function() {
        //     store.data.datesBetween.forEach(date => {
        //         api.retrieveRates(date).then(res => {
        //             store.data.ratesTotal += res[store.data.roomType.name].rate;
        //             store.data.choosed.push({
        //                 date: date,
        //                 rate: res[store.data.roomType.name].rate
        //             });
        //             this.update();
        //         })
        //     })
        // }
    }
})