// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    use: [{
      "use_name": "全部"
    },
    {
      "use_name": "待付款"
    },
    {
      "use_name": "待发货"
    },
    {
      "use_name": "待收货"
    },
    {
      "use_name": "待评价"
    },
    ],
    neirong:[{
        "use_pj": "111"
      }
      ,
      {
        "use_pj": "222"
      }
      ,
      {
        "use_pj": "333"
      }
      ,
      {
        "use_pj": "444"
      }
      ,
      {
        "use_pj": "555"
      }],
    state: '',
  },
  //选择用途后加样式
  select_use: function (e) {
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  },
})
