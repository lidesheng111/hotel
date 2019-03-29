const store = require('../../store.js');
const create = require('../../utils/create.js');

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
      isCounting: false,
      counting: 0,
      logged: false,
      userInfo:{},
  },

    intoAdmin: function (e) {
        var _this = this;
        if (!this.data.isCounting) {
            setInterval(function () {
                _this.setData({
                    counting: 0,
                })
            }, 3000);
            this.data.isCounting = true;
        }
        this.data.counting++;
        if (this.data.counting >= 7) {
            wx.navigateTo({
                url: '/pages/admin/admin'
            })
        }
    }, 

    getUserInfo(e) {
        console.log(e);
        this.store.data.userInfo = e.detail.userInfo;
        this.store.data.logged = true;
        this.update();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})