import _ from 'lodash'

export let formMixin = {
  data () {
    return {
      checkState: false,
      formVal: {
        id: null,
        name: null,
        price: null,
        member_price: null,
        quantity: null
      },
      formLabel: {
        id: 'ID',
        name: '商品名',
        price: '価格',
        member_price: '部員価格',
        quantity: '数量'
      },
      validationRules: {
        name: { required: true, message: '必須項目です', trigger: 'blur' },
        price: [
          { type: 'integer', min: 0, required: true, message: '有効な値を入力してください', trigger: 'blur' }
        ],
        member_price: [
          { type: 'integer', min: 0, required: true, message: '有効な値を入力してください', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    check (state) {
      this.checkState = state
    },

    checkValid (formName, callback, ...args) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          callback(...args)
        }
      })
    },

    clearForm () {
      this.formVal = _.mapValues(this.formVal, v => null)
    }
  }
}
