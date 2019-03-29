const store = require('../../store.js');
const create = require('../../utils/create.js');
const app = getApp();
const utils = require("../../utils/utils.js");
const api = require("../../utils/api.js");
const db = wx.cloud.database();

create(store, {
  data: {
    // up: 'false',
    checkInDate: '',
    checkOutDate: '',
    inDateWeekDay: '',
    outDateWeekDay: '',
    week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    id: [1, 2],
    stay: '',
    confirmStay: false,
    // scrollHeight: '',
    // down: false
    roomList: null,
    dateRate: null,
    datesBetween: [],
  },

  // onConfirm() {
  //   var inDate = new Date(this.store.data.checkInDate);
  //   var outDate = new Date(this.store.data.checkOutDate);
  //   if (inDate >= outDate) {
  //     utils.showToast('退房日期需迟于入住日期');
  //     return;
  //   }
  // },

  // 更新房价
  updateRates() {
    api.retrieveRates(this.store.data.checkInDate).then(res => {
      this.store.data.dateRate = res;
      this.update();
    });
  },

  onLoad: function(options) {
    api.retrieveRoomTypes().then(res => {
      this.store.data.roomList = res.data;
      this.update();
    })
    // 获取房价
    api.retrieveRates(this.store.data.checkInDate).then(res => {
      this.store.data.dateRate = res;
      this.update();
    });
  },
  
  onConfirmStay() {
    this.store.data.confirmStay = true;
    this.store.data.datesBetween = utils.datesBetween(this.store.data.checkInDate, this.store.data.checkOutDate);
    this.update();
  },

  toRoomDetails(value) {
    if (this.data.confirmStay) {
      wx.navigateTo({
        url: '../../pages/roomDetails/roomDetails?_id=' + value.currentTarget.dataset.id,
      })
    } else {
      utils.showToast('请选择入住、退房日期')
    }
  },

  // wx.addCard({
    //     cardList: [],
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    // })
    // wx.loadFontFace({
    //     family: 'Light',
    //     source: 'url(" https://shangbalahotel-1256857292.cos.ap-chengdu.myqcloud.com/HYXiDengXianJ.ttf")',
    //     success: console.log
    // })

    // wx.createSelectorQuery().select('.room-list').boundingClientRect((rect) => {
    //     this.update({
    //         scrollHeight: rect.height
    //     })
    // }).exec()

  // onPageScroll(e) {
  //     if (e.scrollTop > this.data.scrollTop || e.scrollTop >= this.data.scrollHeight) {
  //         //向下滚动 
  //         this.update({
  //             up: false
  //         })
  //         // console.log('向下 ', this.data.scrollHeight)
  //     } else {
  //         this.update({
  //             up: true
  //         })
  //         // console.log('向上滚动 ', this.data.scrollHeight)
  //     }
  // },

  // slideDown () {
  //   this.update ({
  //     down: true
  //   })
  // },


  onReady: function() {
  },

  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('hide');
    this.store.data.roomType = null;
    this.update();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('unload');
    this.store.data.roomType = null;
    this.update();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})