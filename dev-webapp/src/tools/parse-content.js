export default str => {
  let rel = str

  // 网页链接转换
  // rel = rel.replace(/((http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w\u4e00-\u9fa5\-./?@%!&=+~:#;,]*)?)/ig, function (link) {
  //   return '<a target="_blank" href="' + link + '"><i class="fa fa-link"></i> 网页链接</a>'
  // })

  // 标签转换
  rel = rel.replace(/#([^#|.]+)#/g, function (word) {
    return '<span class="feed_content_tag" tag="' + word.replace(/#/g, '') + '">' + word + '</span>'
  })

  return rel
}
