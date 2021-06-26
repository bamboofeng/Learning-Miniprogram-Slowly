// miniprogram/pages/006progress/006progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percentValue: 0,
    progressValue: 20
  },
  onProgressActiveEnd(e){
    console.log(e)
  },
  onTapProgressBar(e){
    console.log(e)
    let progress = this.data.percentValue
    if (progress < 100){
      progress += 5
      this.setData({percentValue:Math.min(100, progress)})
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let intervalId = setInterval(() => {
      if (this.data.progressValue < 80) {
        this.data.progressValue++;
        this.setData({
          progressValue: this.data.progressValue
        });
      } else {
        clearInterval(intervalId);
      }
    }, 25);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 7环形进度条
  drawProgress(){
    if (this.data.percentValue >= 100){
      this.setData({
        percentValue:0
      })
    }
    this.setData({
      percentValue:this.data.percentValue+10
    })
  }
})

