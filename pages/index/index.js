//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidden: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      var me = this;
      me.LoadWeather();
  },

  LoadWeather:function () {
      var me = this;
      me.setData({
          hidden: false,
      });
      wx.request({
          url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json', //仅为示例，并非真实的接口地址
          data:{},
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
              var city = res.data.city;
              wx.request({
                  url: 'http://www.sojson.com/open/api/weather/json.shtml?city=' + city, //仅为示例，并非真实的接口地址
                  header: {
                      'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                      var data = res.data.data.forecast;
                      var weather = new Array();
                      data.forEach(function (t,i) {
                          var high = t.high.replace(/[^\d.]/g,'');
                          var low = t.low.replace(/[^\d.]/g,'');
                          var date = t.date;
                          var type = '';
                          console.log(low);
                          if (t.type == '暴雪') {
                              type = 'baoxue'
                          } else if ( t.type == '暴雨') {
                              type = 'baoyu'
                          } else if ( t.type == '冰雹') {
                              type = 'bingbao'
                          } else if ( t.type == '大雪') {
                              type = 'daxue'
                          } else if ( t.type == '大雨') {
                              type = 'dayu'
                          } else if ( t.type == '多云') {
                              type = 'duoyun'
                          } else if ( t.type == '雷阵雨') {
                              type = 'leizhenyu'
                          } else if ( t.type == '霾') {
                              type = 'mai'
                          } else if ( t.type == '晴') {
                              type = 'qing'
                          } else if ( t.type == '雾') {
                              type = 'wu'
                          } else if ( t.type == '小雪') {
                              type = 'xiaoxue'
                          } else if ( t.type == '小雨') {
                              type = 'xiaoyu'
                          } else if ( t.type == '阴') {
                              type = 'yin'
                          } else if ( t.type == '雨夹雪') {
                              type = 'byujiaxue'
                          } else if ( t.type == '阵雨') {
                              type = 'zhenyu'
                          } else if ( t.type == '中雨') {
                              type = 'zhongyu'
                          } else {
                              type = 'qing'
                          }
                          weather[i] = {
                              range: low +  '°~' + high + '°' ,
                              weather: type,
                              temp: parseInt(parseInt(high) + parseInt(low))/2 + '°C',
                              city: city,
                              day: date.substr(date.length-3,3)
                          };


                      });
                      me.setData({
                          hidden: true,
                      });
                      me.setData({
                          weather:weather,
                      })



                  }
              });
          }
      });
  }
})
