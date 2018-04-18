const _images = [
  'http://img01.wanfangche.com/public/upload/201706/04/5934210c0bb14.jpeg?x-oss-process=style/ytsy',
  'http://img01.wanfangche.com/public/upload/201706/04/5934211a50c5f.jpg?x-oss-process=style/ytsy',
  'http://img01.wanfangche.com/public/upload/201706/04/59342121dc07a.jpg?x-oss-process=style/ytsy',
  'http://img01.wanfangche.com/public/upload/201706/04/5934212f53d18.jpg?x-oss-process=style/ytsy',
  'http://img01.wanfangche.com/public/upload/201706/04/59342140c0a11.jpg?x-oss-process=style/ytsy'
]
export default {
  getList (cb) {
    let tempList = []
    for (let i of _images) {
      tempList.push({title: '', img: i})
    }
    setTimeout(() => cb(tempList), 100)
  }
}
