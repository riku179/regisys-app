<template>
<div class="context">

  <h2>商品管理</h2>

  <div class="stick-right">
    <el-button-group>
      <el-button type="primary" @click="jumpCreatePage" size="mini">新規出品</el-button>
      <el-button type="primary" size="mini">値札発行</el-button>
    </el-button-group>
  </div>

  <el-tabs v-model="activeTab" @tab-click="handleTabClick">
    <el-tab-pane label="自分の商品" name="mine">

      <el-table :data="myItems" size="mini">
        <el-table-column prop="name" label="商品名" min-width="150"></el-table-column>
        <el-table-column prop="price" label="価格" min-width="30"></el-table-column>
        <el-table-column prop="member_price" label="部員価格" min-width="50"></el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="30"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="70">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="handleEdit(scope.row)" size="mini"></el-button>
              <el-button icon="el-icon-delete" @click="handleDelete(scope.row)" size="mini"></el-button>
            </el-button-group>
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
import { fetchMyItems, fetchAllItems, deleteItem } from '@/api'
import { handleErrMixin } from '../mixins'

export default {
  mixins: [handleErrMixin],

  created () {
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

    handleEdit (row) {
      this.$router.push(`/items/edit/${row.id}`)
    },

    async handleDelete (row) {
      try {
        await this.$confirm(`この商品を本当に削除しますか？<br><b>${this.escape_html(row.name)}</b><br>この操作は取り消すことができません。`, '警告', {
          type: 'error',
          dangerouslyUseHTMLString: true,
          confirmButtonText: '削除',
          confirmButtonClass: 'el-button--danger',
          cancelButtonText: 'キャンセル'
        })
        try {
          await deleteItem(row.id)
          this.showMyItems()
          this.$message('商品は削除されました')
        } catch (e) {
          this.$message.error('商品は削除できませんでした')
          this.handleErr(e)
        }
      } catch (e) {}
    },

    jumpCreatePage () {
      this.$router.push('/items/create')
    },

    async showMyItems () {
      this.myItems = await fetchMyItems()
    },
    async showAllItems () {
      this.allItems = await fetchAllItems()
    },

    escape_html (data) {
      if (typeof data !== 'string') {
        return data
      }
      return data.replace(/[&'`"<>]/g, (match) => {
        return {
          '&': '&amp;',
          "'": '&#x27;',
          '`': '&#x60;',
          '"': '&quot;',
          '<': '&lt;',
          '>': '&gt;'
        }[match]
      })
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
