let util = {

}
util.title = function (title) {
  title = title ? title + '' : 'Chikalicious'
  window.document.title = title
}

export default util
