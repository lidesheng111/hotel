const db = wx.cloud.database();

const store = require('../../store.js');
const create = require('../../utils/create.js');
const utils = require('../../utils/utils.js');

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    orderList: '',
    selectedTotal: 0,
    allSelected: false,
    selected: false,
    selectedId: [],
    allTotal: 0,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._retrieveCart();
  },

  _retrieveCart() {
    db.collection('cart').where({
      paid: false
    }).get().then(res => {
      // 订单数量
      this.update({
        count: res.data.length
      })
      // 订单总价
      res.data.forEach(item => {
        this.update({
          allTotal: this.data.allTotal + item.total
        })
      })
      this.store.data.orderList = res.data;
      this.update();

      // res.data.forEach(item => {
      //   if (item.paid) {
      //     console.log(item)
      //     db.collection('order').add({
      //       data: {paid: item},
      //       success: res => {
      //         console.log(res, 'order')
      //       },
      //       fail: err => {
      //         console.error(err)
      //       }
      //     })
      //   }
      // })

      wx.setStorage({
        key: 'cart',
        data: res.data
      })
    })
  },

  onCheckChange(e) {
    // 通过选中数量，确定全选状态
    if (e.detail.value.length == this.data.count) {
      this.update({
        allSelected: true
      })
    } else if (e.detail.value.length == this.data.count - 1) {
      this.update({
        allSelected: false
      })
    }

    // 更新总价
    this.update({
      selectedTotal: 0,
      selectedId: e.detail.value
    })

    wx.getStorage({
      key: 'cart',
      success: res => {
        console.log(res, 'st');
        var array = res.data;
        var filteredArray = array.filter(item => e.detail.value.includes(item._id));
        filteredArray.forEach(one => {
          this.update({
            selectedTotal: this.data.selectedTotal + one.total
          })
        })
      },
    })
  },
  onCountsTotal(e) {
    console.log(e)
  },

  // onChecked(e) {
  //   console.log(e)
  // },

  // 通过value是否有值，确定全选状态
  onSelectAll(e) {
    if (e.detail.value.length == 0) {
      this.update({
        selected: false,
        selectedTotal: 0
      })
    } else {
      this.update({
        selected: true,
        selectedTotal: this.data.allTotal
      })
    }
  },

  onDelete(e) {
    db.collection('cart').doc(e.currentTarget.dataset.id).remove({
      success: res => {
        console.log(res)
      }
    })
    this.update({
      allTotal: 0
    })
    this._retrieveCart();
  },

  onPay() {
    this.data.selectedId.forEach(id => {
      db.collection('cart').doc(id).update({
        data: {
          paid: true
        },
        success: res => {
          console.log(res)
        }
      })
    })
  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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