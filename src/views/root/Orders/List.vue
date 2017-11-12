<template>
<div class="context">

  <h2>会計履歴</h2>

  <div class="stick-right">
    <el-button type="primary" @click="jumpSalesPage" size="mini">売上集計</el-button>
  </div>

  <el-tabs v-model="activeTab" @tab-click="handleTabClick">

    <el-tab-pane label="自分の履歴" name="mine">
      <el-table :data="myOrders" size="mini">
        <el-table-column prop="created_at" label="日付" min-width="70"></el-table-column>
        <el-table-column prop="item.name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
        <el-table-column prop="sales" label="売上" min-width="30"></el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="全ての履歴" name="all">
      <el-table :data="allOrders" size="mini">
        <el-table-column prop="created_at" label="日付" min-width="70"></el-table-column>
        <el-table-column prop="item.name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
        <el-table-column prop="sales" label="売上" min-width="30"></el-table-column>
        <el-table-column prop="item.owner.username" label="出品者" min-width="50"></el-table-column>
      </el-table>
    </el-tab-pane>

  </el-tabs>
</div>
</template>

<script>
import _ from 'lodash'
import { fetchMyOrders, fetchAllOrders } from '@/api'
import { handleErrMixin } from '../mixins'

export default {
  mixins: [handleErrMixin],

  created () {
    this.showMyOrders()
  },

  data () {
    return {
      activeTab: 'mine',
      myOrders: [],
      allOrders: []
    }
  },

  methods: {
    handleTabClick (tab) {
      if (tab.name === 'mine') {
        this.showMyOrders()
      } else if (tab.name === 'all') {
        this.showAllOrders()
      }
    },

    jumpSalesPage () {
      this.$router.push('/orders/sales')
    },

    async showMyOrders () {
      try {
        this.myOrders = _.chain(
          await fetchMyOrders()
        )
          .map(this.calcSales)
          .map(this.convertDatetime).value()
      } catch (e) {
        this.handleErr(e)
      }
    },

    async showAllOrders () {
      try {
        this.allOrders = _.chain(
          await fetchAllOrders()
        )
          .map(this.calcSales)
          .map(this.convertDatetime).value()
      } catch (e) {
        this.handleErr(e)
      }
    },

    calcSales (order) {
      return _.assign(order, {sales: order.price * order.quantity})
    },

    convertDatetime (order) {
      return _.assign(order, {created_at: (new Date(order.created_at).toLocaleString())})
    }
  }
}
</script>

<style scoped>
  .stick-right {
    width: 200px;
    margin-left: auto;
  }
</style>
