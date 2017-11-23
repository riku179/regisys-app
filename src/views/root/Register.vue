<template>
  <div class="context">

    <h2>レジ</h2>

    <el-alert title="部員価格が適用されています" type="warning" :closable="false" center show-icon style="margin-bottom: 20px" v-if="is_member"></el-alert>
    <el-alert title="通常価格が適用されています" type="info" :closable="false" center show-icon style="margin-bottom: 20px" v-else></el-alert>

    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input id="barcode-input" v-model="rawCode" @keyup.enter.native="getItem" placeholder="バーコードを読み取って下さい" :disabled="checkState"></el-input>
      </el-col>
    </el-row>

    <el-table :data="cart">
      <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
      <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
      <el-table-column prop="member_price" label="部員価格" min-width="50"></el-table-column>
      <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
    </el-table>

    <el-dialog title="個数指定" :visible.sync="quantityDialogVisible">
      <el-form>
        <el-form-item label="個数">
          <el-input-number :min="1" v-model.number="quantity"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pushToCart" @keyup.enter="pushToCart">確定</el-button>
      </span>
    </el-dialog>

    <p class="price-sum">合計: ￥ {{ sum }}</p>

    <el-button type="primary" @click="checkState = true" style="margin-top: 20px" v-if="!checkState">確認する</el-button>
    <template v-else>
      <p>もう一度カートの内容と実際の商品をチェックしてください</p>
      <el-button type="warning" @click="execOrder" style="margin-top: 20px">会計する</el-button>
    </template>

  </div>
</template>

<script>
import { fetchItem, pushOrder } from '@/api'
import _ from 'lodash'

export default {
  data () {
    return {
      rawCode: '',
      item: null,
      cart: [],
      quantity: 1,
      is_member: false,
      quantityDialogVisible: false,
      checkState: false
    }
  },

  computed: {
    sum () {
      let sumItem = (sum, item) => sum + (this.is_member ? item.member_price : item.price) * item.quantity
      return _.reduce(this.cart, sumItem, 0)
    }
  },

  async created () {
    try {
      await this.$confirm('購入者はMMA部員ですか？', '確認', {
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        type: 'warning'
      })
      this.is_member = true
    } catch (e) {
      this.is_member = false
    }
  },

  methods: {
    async getItem () {
      try {
        if (this.rawCode.length === 0) return
        this.item = await fetchItem(this.rawCode)
        this.quantity = 1
        this.quantityDialogVisible = true
      } catch (e) {
        this.$message.error('商品が存在しません')
      } finally {
        this.rawCode = ''
      }
    },

    pushToCart () {
      this.quantityDialogVisible = false
      this.item.quantity = this.quantity
      this.cart.push(this.item)
      this.item = null
      this.$el.querySelector('#barcode-input').focus()
    },

    async execOrder () {
      this.checkState = false
      let jobs = this.cart.map(item => (async () => {
        let order = {
          price: this.is_member ? item.member_price : item.price,
          quantity: item.quantity,
          item: item.id
        }
        await pushOrder(order)
      })())

      try {
        await Promise.all(jobs)
        this.cart = []
        this.$message.success('正常に会計処理が完了しました')
      } catch (e) {
        this.$message.error('会計処理に失敗しました')
        this.handleErr(e)
      }
    }
  }
}
</script>

<style scoped>
  .price-sum {
    font-size: 150%
  }
</style>
