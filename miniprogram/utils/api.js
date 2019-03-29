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

module.exports = {
  retrieveRoomTypes,
  retrieveRates,
}