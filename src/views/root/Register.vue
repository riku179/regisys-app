<template>
  <div class="context">

    <h2>レジ</h2>

    <el-alert title="部員価格が適用されています" type="warning" :closable="false" center show-icon style="margin-bottom: 10px" v-if="is_member"></el-alert>

    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input id="barcode-input" v-model="rawCode" @keyup.enter.native="getItem" placeholder="バーコードを読み取って下さい"></el-input>
      </el-col>
    </el-row>

    <el-table :data="cart">
      <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
      <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
      <el-table-column prop="member_price" label="部員価格" min-width="50"></el-table-column>
      <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchItem } from '@/api'

export default {
  data () {
    return {
      is_member: false,
      rawCode: '',
      cart: []
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
        let data = await fetchItem(this.rawCode)
        this.cart.push(data)
      } catch (e) {
        this.$message.error('商品が存在しません')
      } finally {
        this.rawCode = ''
        this.$el.querySelector('#barcode-input').focus()
      }
    }
  }
}
</script>
