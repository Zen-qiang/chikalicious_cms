let util = {

}
util.title = function (title) {
  title = title ? title + '' : 'Chikslicious'
  window.document.title = title
}

export default util
