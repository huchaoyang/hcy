// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bangding:function(e){
    wx.navigateTo({
      url: '../phone/phone',
    })
  }
})