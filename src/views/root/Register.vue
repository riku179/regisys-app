<template>
  <div class="context">

    <h2>レジ</h2>

    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input v-model="rawCode" placeholder="バーコードを読み取って下さい"></el-input>
        <el-button @click="getItem">カートに入れる</el-button>
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

  methods: {
    async getItem () {
      try {
        let data = await fetchItem(this.rawCode)
        this.cart.push(data)
      } catch (e) {
        this.$message.error('商品が存在しません')
      }
    }
  }
}
</script>
