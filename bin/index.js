#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const async = require('async')
const downloadFile = require('dlfile')
const process = require('process')

const cwd = process.cwd()
// 批量下载文件，文件的数据格式是 [{url:'xx',title:'xx'}]
const downloadBatch = (data, dir = cwd, urlKey = 'url', titleKey = 'title') => {
  async.mapSeries(data, (item, callback) => {
    if (!item[urlKey]) {
      return
    }
    const fn = () => {
      downloadFile(item[urlKey], dir, item[titleKey])
      callback && callback(null, item)
    }
    // 一般接口需要加延迟，不然可能加大服务器压力
    setTimeout(fn, 500)
  })
}

var argv = require('minimist')(process.argv.slice(2))
console.log(argv._)

const dataFilePath = path.resolve(argv._[0])
if (argv._.length) {
  const data = JSON.parse(fs.readFileSync(dataFilePath))
  if (!Array.isArray(data)) {
    console.error('data must be array')
  } else {
    downloadBatch(data, argv.slice(1))
  }
}
