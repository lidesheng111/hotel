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
        orderTotal: 0,
        allSelected: false,
        selected: false,
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
        db.collection('cart').get().then(res => {
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
        })
    },

    onSelect(e) {
        // 通过选中数量，确定全选状态
        if(e.detail.value.length==this.data.count) {
            this.update({
                allSelected: true
            })
        } 
        else if (e.detail.value.length == this.data.count-1){
            this.update({
                allSelected: false
            })
        }

        // 更新总价
        this.update({
            orderTotal: utils.sum(e.detail.value)
        })
    },
    onCountsTotal(e) {
        console.log(e)
    },

    // 通过value是否有值，确定全选状态
    onSelectAll(e) {
        if(e.detail.value.length==0){
            this.update({
                selected: false,
                orderTotal: 0
            })
        }else{
            this.update({
                selected: true,
                orderTotal: this.data.allTotal
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