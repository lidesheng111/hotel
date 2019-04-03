wx.cloud.init();
const db = wx.cloud.database();

// 获取所有房型
const retrieveRoomTypes = async function(arg) {
  if (arg == undefined) {
    return await db.collection('roomTypes').get().then(res => {return res;})
  } else {
    return await db.collection('roomTypes').where({
      _id: arg
    }).get().then(res => {return res});
  }  
}

// 获取每个房型的房价
const retrieveRates = async function (date) {
  return await db.collection('dateAndRoom').where({
    date: date
  }).get().then(res => {
    return res.data[0];
  })
}

// 获取已支付订单
const retrieveCart = async function() {
  return await db.collection('cart').where({
    paid: true
  }).get().then(res => {
    return res.data
  })
}

module.exports = {
  retrieveRoomTypes,
  retrieveRates,
  retrieveCart
}