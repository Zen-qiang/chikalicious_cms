import lodash from 'lodash'

const genericInstall = (Vue) => {
  Vue.$lodash = lodash
  Object.defineProperties(Vue.prototype, {
    $lodash: { get () { return lodash } }
  })
}

const VueLodash = {
  install (Vue, options) {
    if (options && options.name) {
      Vue[options.name] = lodash
      Object.defineProperties(Vue.prototype, {
        [options.name]: { get () { return lodash } }
      })
    }
    genericInstall(Vue)
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(VueLodash)
    }
  }
}

export default VueLodash
