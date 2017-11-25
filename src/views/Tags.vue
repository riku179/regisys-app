<template>
  <div class="context">
      <table class="tag" border v-for="item in items" :key="item.id">
        <tr>
          <img class="logo" src="../assets/mma_logo.svg" height="70px" />
        </tr>
        <tr><b>{{ item.name }}</b></tr>
        <tr>価格: {{ item.price }}円</tr>
        <tr>出品者: {{ item.owner.username }}</tr>
        <tr>
          <barcode :value="item.id"></barcode>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { fetchMyItems, fetchAllItems } from '@/api'
import barcode from '@/components/Barcode'
import { setTokenIntoApiClient } from '@/lib/auth'

export default {
  components: {
    barcode
  },

  data () {
    return {
      items: []
    }
  },

  async created () {
    setTokenIntoApiClient()

    let items
    let owner = this.$route.query.owner
    let unsoldOnly = this.$route.query.unsold_only !== 'false'

    if (!owner) {
      items = await fetchMyItems()
    } else if (owner === 'all') {
      items = await fetchAllItems()
    } else {
      items = _.filter(await fetchAllItems(), item => item.owner.username === owner)
    }

    // 数量分だけitemを増やす(数量３の商品の値札は３つ欲しい)
    if (unsoldOnly) {
      // 売れているものは表示しない
      items.forEach(item => {
        for (let i = 0; i < item.quantity - item.orders.length; i++) {
          this.items.push(item)
        }
      })
    } else {
      // 売れていようがいまいが全部表示
      items.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          this.items.push(item)
        }
      })
    }
  }
}
</script>

<style>
.el-header {
  display: none;
}

.tag {
  max-width: 150px;
  display: inline-block;
  margin: 5px;
  border-collapse: collapse;
}

.logo {
  width: 100px;
  height: 50px;
  object-fit: cover;
}

.tag tr {
  text-align: center;
}
</style>
