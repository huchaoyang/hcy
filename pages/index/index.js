

// // Page({
// //   data: {
// //     
// //   },

// // })
// // index.js
// const appInstance = getApp();
// const { globalData: { defaultCity, defaultCounty } } = appInstance

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     location: defaultCity,
//     county: defaultCounty,
//     movies: [
//       { url: '../image/car.jpg' },
//       { url: '../image/car2.jpg' },
//     ]
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     //加定位
//     // this.getLocation();
//   },
//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     const { globalData: { defaultCity, defaultCounty } } = appInstance
//     this.setData({
//       location: defaultCity,
//       county: defaultCounty
//     })
//   },
// })
import { LETTERS, HOT_CITY_LIST } from '../../locale/citydata'
import { commonMessage } from '../../locale/commonMessageZhCn'
import { AutoPredictor } from '../../utils/autoPredictor'
import utils from '../../utils/utils'


const {
  isNotEmpty,
  safeGet,
  getCityListSortedByInitialLetter,
  getLocationUrl,
  getCountyListUrl,
  getIndexUrl,
  onFail,
} = utils;
const appInstance = getApp();
const { globalData: { defaultCity, defaultCounty } } = appInstance
Page({
  data: {
    city: defaultCity,
    county: defaultCounty,
    movies: [
      { url: '../image/car.jpg' },
      { url: '../image/car2.jpg' },
    ],
    sideBarLetterList: [],
    winHeight: 0,
    cityList: [],
    hotCityList: HOT_CITY_LIST,
    showChosenLetterToast: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: commonMessage['location.getting'],
    currentCityCode: '',
    inputName: '',
    completeList: [],
    county: '',
    showCountyPicker: false,
    auto: true, // 自动手动定位开关
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    const cityListSortedByInitialLetter = getCityListSortedByInitialLetter();
    const sysInfo = wx.getSystemInfoSync();
    const winHeight = sysInfo.windowHeight;
    const sideBarLetterList = LETTERS.map(letter => ({ name: letter }));
    this.setData({
      winHeight,
      sideBarLetterList,
      cityList: cityListSortedByInitialLetter
    });
    // 定位
    this.getLocation();
  },

  touchSideBarLetter: function (e) {
    const chosenLetter = safeGet(['currentTarget', 'dataset', 'letter'], e)
    this.setData({
      toastShowLetter: chosenLetter,
      showChosenLetterToast: true,
      scrollTopId: chosenLetter,
    })
    // close toast of chosenLetter
    setTimeout(() => { this.setData({ showChosenLetterToast: false }) }, 500)
  },




  getLocation: function () {
    console.log(commonMessage['location.city.getting'])

    this.setData({ county: '' })
    wx.getLocation({
      type: 'wgs84',
      success: res => this.getLocationFromGeoCoord(res),
      fail: onFail(commonMessage['location.city.fail']),
    })
  },

  getLocationFromGeoCoord: function (geoCoord) {
    const { latitude, longitude } = geoCoord
    wx.request({
      url: getLocationUrl(latitude, longitude),
      success: location => this.setCityCounty(location)
    })
  },

  setCityCounty: function (location) {
    const { city, adcode, district } = safeGet(['data', 'result', 'ad_info'], location)
    if (this.data.auto) { // 如果开始手动选择，以手动为准
      this.setData({
        city,
        currentCityCode: adcode,
        county: district
      })
      appInstance.globalData.defaultCity = city
      // this.getCountyList();
    }
  },
  onShow: function () {
    const { globalData: { defaultCity, defaultCounty } } = appInstance
    this.setData({
      city: defaultCity,
      county: defaultCounty
    })
  },
})
