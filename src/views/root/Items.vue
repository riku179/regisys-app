<template>
<div>
  <h2>商品管理</h2>

  <el-tabs v-model="activeTab" @tab-click="handleTabClick">
    <el-tab-pane label="自分の商品" name="mine">

      <el-table :data="myItems" @row-click="handleEdit" size="mini">
        <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
        <el-table-column prop="member_price" label="部員価格" min-width="50"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="30">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" @click="handleDelete(scope.row)" size="mini" round></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="全商品" name="all">
      <el-table :data="allItems" size="mini">
        <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
        <el-table-column prop="member_price" label="部員価格" min-width="50"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
        <el-table-column prop="owner.username" label="出品者" min-width="50"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import { fetchMyItems, fetchAllItems } from '@/api'
export default {
  mounted () {
    this.showMyItems()
  },
  data () {
    return {
      activeTab: 'mine',
      myItems: [],
      allItems: []
    }
  },
  methods: {
    handleTabClick (tab) {
      if (tab.name === 'mine') {
        this.showMyItems()
      } else if (tab.name === 'all') {
        this.showAllItems()
      }
    },
    handleEdit (row, event, column) {
      console.log('edit!')
    },
    handleDelete (index, row) {
      console.log(index)
      console.log(row)
    },
    async showMyItems () {
      this.myItems = await fetchMyItems()
    },
    async showAllItems () {
      this.allItems = await fetchAllItems()
    }
  }
}
</script>
