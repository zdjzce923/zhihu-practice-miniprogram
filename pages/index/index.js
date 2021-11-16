const util = require('../../utils/util')
const app = getApp()

Page({
    data: {
        feed: [],
        feed_length: 0
    },
    upper() {
        wx.showNavigationBarLoading()
        this.refresh();
        console.log("upper")
        setTimeout(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
        }, 1500)
    },
    lower() {
        wx.showNavigationBarLoading()
        setTimeout(() => {
            wx.hideNavigationBarLoading()
            this.nextLoad()
        }, 1000)
        console.log("lower")
    },
    nextLoad(){
        wx.showToast({
            title:'加载中',
            icon:'loading',
            duration:1000
        })
        const nextData = util.getNext().data
        this.setData({
            feed: this.data.feed.concat(nextData),
            feed_length: this.data.feed_length + nextData.length
        })
        setTimeout(()=>{
            wx.showToast({
                title:'加载成功',
                icon:'success',
                duration: 1500
            })
        },1000)
    },
    refresh() {
        wx.showToast({
            title: '刷新中',
            icon: 'loading',
            duration: 1500
        })
        const feed = util.getIndexData()
        const feed_data = feed.data;
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        })
        setTimeout(() => {
            wx.showToast({
                title: '刷新成功',
                icon: 'success',
                duration: 1500
            })
        }, 1500)
    },
    onLoad() {
        console.log('onload')
        this.getData()
    },
    getData() {
        const feed = util.getIndexData()
        console.log("loaddata")
        const feed_data = feed.data
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        })
    }
})
