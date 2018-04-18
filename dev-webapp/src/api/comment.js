const _comment = {
  id: 1,
  rater: 4.5,
  content: '房车家族21RV.COM亚欧自驾第66天 6月6日 星期二 中午十二点离开Lake Shkodra Resort露营地，一车四人收费18欧；下午三点出境阿尔巴尼亚进入亚欧自驾第八个国家黑山。出入海关手续简单，只是护照盖章，海关干脆连我们的车都没上就放行了，花18欧购买了黑山15天有效期的车辆保险。全天行车100公里，晚上扎营布德瓦Budva Campground露营地。 ',
  images: [
    'http://img01.wanfangche.com/public/upload/201706/04/5934210c0bb14.jpeg?x-oss-process=style/cut-feed',
    'http://img01.wanfangche.com/public/upload/201706/04/5934211a50c5f.jpg?x-oss-process=style/cut-feed',
    'http://img01.wanfangche.com/public/upload/201706/04/59342121dc07a.jpg?x-oss-process=style/cut-feed',
    'http://img01.wanfangche.com/public/upload/201706/04/5934212f53d18.jpg?x-oss-process=style/cut-feed',
    'http://img01.wanfangche.com/public/upload/201706/04/59342140c0a11.jpg?x-oss-process=style/cut-feed'
  ],
  images_lg: [
    'http://img01.wanfangche.com/public/upload/201706/04/5934210c0bb14.jpeg?x-oss-process=style/ytsy',
    'http://img01.wanfangche.com/public/upload/201706/04/5934211a50c5f.jpg?x-oss-process=style/ytsy',
    'http://img01.wanfangche.com/public/upload/201706/04/59342121dc07a.jpg?x-oss-process=style/ytsy',
    'http://img01.wanfangche.com/public/upload/201706/04/5934212f53d18.jpg?x-oss-process=style/ytsy',
    'http://img01.wanfangche.com/public/upload/201706/04/59342140c0a11.jpg?x-oss-process=style/ytsy'
  ],
  created_at: '2017-06-07',
  user: {
    name: 'Jianbo Li',
    avatar: 'static/img/a2.png',
    id: '10001',
    level: 'V5老司机'
  }
}

const _comments = []

export default {
  getList (cb) {
    for (let i = 0; i < 6; i++) {
      _comment.id = i
      _comments.push(_comment)
    }
    setTimeout(() => cb(_comments), 200)
  },
  getDetail (id, cb, errorCb) {
    setTimeout(() => {
      (typeof (_comment) !== undefined)
      ? cb(_comment)
      : errorCb({msg: 'error'})
    }, 200)
  }
}
