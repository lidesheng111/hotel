const store = require('../../store.js');
const create = require('../../utils/create.js');
const app = getApp();
const utils = require("../../utils/utils.js");

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

    toRoom () {
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