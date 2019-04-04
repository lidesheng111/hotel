const store = require('../../store.js');
const create = require('../../utils/create.js');
const app = getApp();
const db = wx.cloud.database();
const utils = require("../../utils/utils.js");
const api = require('../../utils/api.js');

create(store, {
  data: {
    show: true,
    slideUp: true,
    current: 0,
  },

  onToggle() {
    this.setData({
      slideUp: !this.data.slideUp
    })
  },

  onCall() {
    wx.makePhoneCall({
      phoneNumber: '0891-6323888',
    })
  },

  onReady: function() {

  },

  onLoad() {
    api.retrieveCart().then(res => {
      var today = new Date();
      var year = today.getFullYear();
      res.forEach(one => {
        var checkOutDate = String(year) + '-' + one.checkOutDate;
        var checkDate = new Date(checkOutDate);
        // 判断是否过期
        if (checkDate < today) {
          db.collection('cart').doc(one._id).update({
            data: {
              valid: false
            },
          })

          // 过期超过7天，删除记录
          if ((today.getTime()-checkDate.getTime())/86400000 > 2) {
            db.collection('cart').doc(one._id).remove();
          }
        }
      })
    })
  },

  test(i) {
    this.setData({
      current: i
    })
  },

  // onShow: function() {
  //     var animation = wx.createAnimation({
  //         duration: 5000,
  //         timingFunction: 'ease-in-out'
  //     })

  //     animation.opacity(0.5).step();

  //     this.setData({
  //         animationData: animation.export()
  //     })
  // },

  onPageScroll: function(e) {
    if (e.scrollTop > 10) {
      this.setData({
        show: false
      })
    }
  },

  toRoom() {
    wx.navigateTo({
      url: '/pages/room/room',
    })
  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})