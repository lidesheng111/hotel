const utils = require('./utils/utils.js');
wx.cloud.init();
const db = wx.cloud.database();

module.exports = ({
  data: {
    checkInDate: utils.formateDate({mark: 'start'}),
    checkOutDate: utils.formateDate({mark: 'end'}),
    // stayDate: this.checkInDate,
    inDateWeekDay: '',
    outDateWeekDay: '',
    id: [1, 2],
    stay: function() {
      var stay = (new Date(this.checkOutDate) - new Date(this.checkInDate)) / 86400000;
      return stay > 0 ? stay : 1;
    },
    confirmStay: false,
    quantity: 1,
    roomQuantity: [1],
    extra: 0,
    extraArr: [],
    rate: 0,
    choosed: [],
    ratesTotal: 0,
    total: function () {
      return this.quantity * this.ratesTotal + (this.extra * this.quantity*this.stay);
    },

    logged: false,
    userInfo: '',

    orderList: '',

    current2: '0',
    roomList: null,
    roomType: null,
    dateRate: null,
    datesBetween: [],
    // async function () {
    //   db.collection('dateAndRoom').where({
    //     date: this.checkInDate
    //   }).get().then(res => {
    //     var dateRate = await res.data[0];
    //     return dateRate;
    //   })
    // }
  },

  globalData: [],
})