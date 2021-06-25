
const async = require('async')
const downloadFile = require('dlfile')
const process = require('process')

const cwd = process.cwd()
// 批量下载文件，文件的数据格式是 [{url:'xx',title:'xx'}]
const downloadBatch = (
  data,
  dir = cwd,
  urlKey = 'url',
  titleKey = 'title'
) => {
  async.mapSeries(data, (item, callback) => {
    if (!item[urlKey]) {
      return
    }
    const fn = () => {
      downloadFile(item[urlKey], dir, item[titleKey])
      callback && callback(null, item)
    }
    // 一般接口需要加延迟，不然可能加大服务器压力
    setTimeout(fn, 200)
  })
}
// 下面是demo，打开注释之后，执行此文件 node download-batch.js，便看到dist有两个图片了了
/*
 const data = [
   {
     title: '这才是未来大屏该有的样子',
     url:
       'https://article-fd.zol-img.com.cn/t_s640x2000/g1/M03/02/02/ChMljl2ENKuIV553AAKEYP9wZOQAAP23wGEctEAAoR4006.jpg'
   },
   {
     title: '智慧屏',
     url:
       'https://article-fd.zol-img.com.cn/t_s640x2000/g1/M05/01/06/ChMljV1_QwqIEEeTACmpHidBeUkAAPz4QMudwgAKak2877.jpg'
   }
 ]

 downloadBatch(data, './dist', 'url', 'title')
 */

// let fileDataArr = require('./z_heart_mp4').data
// downloadBatch(fileDataArr, './zest', 'mp4', 'title')
module.exports = downloadBatch
