var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'addressList':[],
    isSelect: false,
    className: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
    this.setData({
      isSelect: !!options.select,
      className: options.select ? 'show' : ''
    })
    if (!app.globalData.token) {
      wx.redirectTo({ url: "/pages/login/login" });
      return false;
    }

    var self = this;
    var postData = {
      token: app.globalData.token
    };

    //获取首页数据    
    app.ajax({
      url: app.globalData.serviceUrl + 'maddresslist.htm',
      data: postData,
      method: 'GET',
      successCallback: function (res) {
        if (res.code == 0) {
          self.setData({
            addressList: res.data.addresslist
          });
        }
      },
      failCallback: function (res) {
        console.log(res);
      }
    });
  },

  //编辑地址信息
  editAddress: function (event) {
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?id=' + id
    })

  },

  // 选择收货地址
  selectAddr: function (event) {
    if (this.data.isSelect) {
      var addr = event.target.dataset.addr;
      app.globalData.newOrder.data.addressbean = addr
      wx.navigateTo({
        url: '/pages/orderdetail/orderdetail'
      }) 
    }
  }
})