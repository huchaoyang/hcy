Page({
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '800-820-88820',
    })
  },
  /**
  * 按钮点击事件
  */
  changeYL: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
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
dingdan:function(e){
  wx.navigateTo({
    url: '../dingdan/dingdan',
  })
},
information:function(){
  wx.navigateTo({
    url: '../information/information',
  })
},
address:function(e){
  wx.navigateTo({
    url: '../adderssone/addressone',
  })
}
})