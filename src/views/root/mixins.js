import _ from 'lodash'

export let handleErrMixin = {
  methods: {
    handleErr (e) {
      if (!e.response || e.response.status >= 500) {
        this.$message.error(e.message)
      } else if (e.response.data) {
        _.forEach(e.response.data, v => {
          this.$notify.error({
            title: e.response.statusText,
            message: v,
            duration: 0
          })
        })
      }
      console.log(e)
    }
  }
}
