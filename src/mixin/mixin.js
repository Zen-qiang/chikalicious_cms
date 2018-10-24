const notBlank = {
  data () {
    return {
      cake: 'CAKE',
      snake: 'SNACK'
    }
  },
  methods: {
    isNotBlank (str) {
      return !str
    }
  }
}
export { notBlank }
