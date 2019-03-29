const create = require('../utils/create');
const utils = require('../utils/utils.js');
const api = require('../utils/api.js');
const app = getApp();

create({
    properties: {
        num: {
            type: Number,
            value: ''
        }
    },

    data: {
        today: utils.formateDate({
            mark: 'today'
        }),
        checkInDate: '',
        checkOutDate: '',
        inDate: function() {
            return this.checkInDate ? this.checkInDate : utils.formateDate({
                mark: 'start'
            });
        },
        outDate: function() {
            return this.checkOutDate ? this.checkOutDate : utils.formateDate({
                mark: 'end'
            });
        }, // 未点击date picker前，产生一个默认日期
        inDateWeekDay: '',
        outDateWeekDay: '',
        confirmStay: false,
    },

    lifetimes: {

    },

    methods: {
        onChangeDate(e) {
            //   var that = this
            var date = e.detail.value;
            date = date.substring(5, 10)
            if (e.currentTarget.id == 1) {
                // this.showModal();
                this.store.data.checkInDate = date;
                this.store.data.inDateWeekDay = new Date(date).getDay(); //设置星期
                this.store.data.confirmStay = false;
                this.update();
                this._varifyDate();
            } else {
                // this.showModal();
                this.store.data.checkOutDate = date;
                this.store.data.outDateWeekDay = new Date(date).getDay();
                this.store.data.confirmStay = false;
                this.update();
                this._varifyDate();
            }
        },

        showModal() {
            var that = this;
            wx.showModal({
                title: '确认日期？',
                cancelText: '取消',
                confirmText: '确定',
                success: function() {
                    that.store.data.confirmStay = true;
                    that.store.data.datesBetween = utils.datesBetween(that.store.data.checkInDate, that.store.data.checkOutDate);
                    that.store.data.ratesTotal = 0;
                    that.store.data.choosed = [];
                    that.update();
                    utils.updateRatesTotal(that);
                }
            })
        },

        _varifyDate() {
            var inDate = new Date(this.store.data.checkInDate);
            var outDate = new Date(this.store.data.checkOutDate);
            if (inDate >= outDate) {
                // utils.showToast('退房日期、入住日期不能相同');
                this.store.data.checkOutDate = utils.formateDate({
                    mark: 'end',
                    start: inDate
                })
            }
        }
    }
})