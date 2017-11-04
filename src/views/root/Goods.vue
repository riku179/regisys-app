<template>
<div>
  <h2>商品管理</h2>
  <el-tabs v-model="activeTab" @tab-click="handleTabClick">
    <el-tab-pane label="自分の商品" name="mine">
      <el-table :data="myGoods">
        <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="100"></el-table-column>
        <el-table-column prop="member_price" label="部員価格" min-width="100"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="50">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" @click="handleDelete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全商品" name="all">

    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'mine',
      myGoods: [{name: 'test item', price: 100, member_price: 90, quantity: 2}],
      allGoods: []
    }
  },
  methods: {
    handleTabClick (tab, event) {
      console.log([tab, event])
    },
    handleDelete () {
      console.log('edit!')
    }
  }
}
</script>
