const store = require('../../store.js');
const create = require('../../utils/create.js');
const app = getApp();
const db = wx.cloud.database();
const utils = require("../../utils/utils.js");
const api = require("../../utils/api.js");

create(store, {

    /**
     * 页面的初始数据
     */
    data: {
        rate: null,
        ratesTotal: 0,

        checkInDate: '',
        checkOutDate: '',
        // stayDate: this.checkInDate,
        id: [1, 2],
        stay: '',
        quantity: 1,
        roomQuantity: ['1'],
        total: '',
        choosed: [],
        extraArr: [],

        current2: '0',

        _hints: '',
        // pickup: false,
        // dropoff: false,
        _sunny: false,
        _Potala: false,
        _oxygen: false,
        _countS: 0,
        _countP: 0,
        _countO: 0,
        _countB: 0,
        _tel: null,
        _forWho: [],

        roomType: null,
        dateRate: null,
        datesBetween: [],

        confirmStay: false,
        show: false
    },

    onLoad: function(options) {
        // 根据_id获取某种房型
        api.retrieveRoomTypes(options._id).then(res => {
            this.store.data.roomType = res.data[0];
            this.store.data.rate = this.store.data.dateRate[res.data[0].name].rate // room rate
            this.update();
        }).then(() => {
            this._updateRatesTotal();
        })
    },

    _updateRatesTotal() {
        this.store.data.datesBetween.forEach(date => {
            api.retrieveRates(date).then(res => {
                this.store.data.ratesTotal += res[this.store.data.roomType.name].rate;
                this.store.data.choosed.push({
                    date: date,
                    rate: res[this.store.data.roomType.name].rate
                });
                this.update();
            })
        })
    },

    onLess() {
        if (this.store.data.quantity > 1) {
            this.store.data.quantity--;
            this.store.data.roomQuantity.pop();
            this.update();
        }
    },
    onMore() {
        this.store.data.quantity++;
        this.store.data.roomQuantity.push(this.store.data.quantity);
        this.update();
    },

    // controls swiper
    onSelected(e) {
        var i;
        if (e.type == 'change') {
            i = e.detail.current;
        } else {
            i = e.currentTarget.dataset.id;
        }
        this.store.data.current2 = i;
        this.update();
    },

    // 计算特殊选购价格之和
    onChange(e) {
        this.store.data.extra = this._sum(e.detail.value);
        this.update();
    },
    _sum(arr) {
        var sum = 0;
        arr.forEach(item => {
            sum += Number(item);
        })
        return sum;
    },

    // 控制提示显隐
    onSunny(e) {
        this._onExtra(e.currentTarget.dataset.id, this.data._countS);
    },
    onPotala(e) {
        this._onExtra(e.currentTarget.dataset.id, this.data._countP, '观景房在四楼，电梯只到三楼，住此房型需步行一层楼');
    },
    onOxygen(e) {
        this._onExtra(e.currentTarget.dataset.id, this.data._countO, '对比参考：200元左右的大钢瓶氧气罐只能持续使用2-5小时');
    },
    onExtraBed(e) {
        this._onExtra(e.currentTarget.dataset.id, this.data._countB);
    },

    _onExtra(id, count, str) {
        if (id == 0) {
            if (count == 1) {
                this.update({
                    _countS: 0
                })
            } else {
                this.update({
                    _hints: '',
                    _countS: 1
                })
            }
        } else if (id == 1) {
            if (count == 1) {
                this.update({
                    _hints: '',
                    _countP: 0
                })
            } else {
                this.update({
                    _hints: str,
                    _countP: 1
                })
            }
        } else if (id == 2) {
            if (count == 1) {
                this.update({
                    _hints: '',
                    _countO: 0
                })
            } else {
                this.update({
                    _hints: str,
                    _countO: 1
                })
            }
        } else {
            if (count == 1) {
                this.update({
                    _hints: '',
                    _countB: 0
                })
            } else {
                this.update({
                    _hints: '',
                    _countB: 1
                })
            }
        }
    },

    onInputTel(e){
        if(e.detail.value.length == 0) {
            utils.showToast('号码不能为空');
        } else{
            this.update({
                _tel: e.detail.value
            })
        }
    },

    onInputName(e) {
        if (e.detail.value.length == 0) {
            utils.showToast('姓名不能为空');
        } else {
            this.data._forWho.push(e.detail.value);
        }
    },

    _onExtraArr() {
        if (this.data._countS == 1) {
            this.store.data.extraArr.push({
                item: '朝阳房',
                price: 30
            });
        }
        if (this.data._countP == 1) {
            this.store.data.extraArr.push({
                item: '布宫窗景房',
                price: 30
            });
        }
        if (this.data._countO == 1) {
            this.store.data.extraArr.push({
                item: '吸氧设施',
                price: 50
            });
        }
        if (this.data._countB == 1) {
            this.store.data.extraArr.push({
                item: '加床',
                price: 100
            });
        }
        this.update();
    },

    onAddCart() {
        if (this.data._tel == null || this.data._forWho.length == 0){
            utils.showToast('联系人信息不能为空');
        } else {
            this._onExtraArr();
            db.collection('cart').add({
                data: {
                    extraArr: this.store.data.extraArr,
                    roomId: this.store.data.roomType._id,
                    roomType: this.store.data.roomType.type,
                    roomImg: this.store.data.roomType.imgHead,
                    checkInDate: this.store.data.checkInDate,
                    checkOutDate: this.store.data.checkOutDate,
                    stay: this.store.data.stay,
                    quantity: this.store.data.quantity,
                    total: this.store.data.total,
                    paid: false,
                    tel: this.data._tel,
                    forWho: this.data._forWho
                },
                success: res => {
                    console.log(res)
                },
                fail: err => {
                    console.log(err)
                }
            })
        }
    },

    //   onPickup(e) {
    //     this.update({
    //       pickup: !e.currentTarget.dataset.checked
    //     })
    //     if (this.data.pickup == true) {
    //       this.store.data.extra += 150;
    //       this.update({
    //         hints: '市场价200元--300元'
    //       })
    //     } else if (this.data.pickup == false) {
    //       this.store.data.extra -= 150;
    //       this.update({
    //         hints: ''
    //       })
    //     }
    //     this.update();
    //   },
    //   onDropoff(e) {
    //     this.update({
    //       dropoff: !e.currentTarget.dataset.checked
    //     })
    //     if (this.data.dropoff == true) {
    //       this.store.data.extra += 150;
    //       this.update({
    //         hints: '市场价200元--300元'
    //       })
    //     } else if (this.data.dropoff == false) {
    //       this.store.data.extra -= 150;
    //       this.update({
    //         hints: ''
    //       })
    //     }
    //     this.update();
    //   },

    onReady: function() {
        //   https://stackoverflow.com/questions/33994596/price-rules-database-design-for-hotel-reservation-system
        //   https://stackoverflow.com/questions/9039153/hotel-reservation-system-how-to-store-individual-price-for-each-night-of-a-rese?rq=1
        //   https://stackoverflow.com/questions/8008495/decoupling-mysql-data-versus-ease-of-use/8009992#8009992
    },

    onShow: function() {

    },

    onHide: function() {},

    onUnload: function() {
        this.store.data.quantity = 1;
        this.store.data.ratesTotal = 0;
        this.store.data.choosed = [];
        this.store.data.extra = 0;
        this.update();

        this.update({
            _hints: '',
            _countO: 0,
            _countP: 0,
            _countS: 0,
            _countB: 0
        })
    },

    onPullDownRefresh: function() {

    },

    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})