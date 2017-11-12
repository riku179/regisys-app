<template>
<div class="context">

  <h2>売上集計</h2>

  <el-date-picker
    v-model="dateRange"
    type="datetimerange"
    range-separator="To"
    start-placeholder="From"
    end-placeholder="To"
    @change="fetchAggregations">
  </el-date-picker>

  <el-table :data="results">
    <el-table-column prop="username" label="ユーザー" min-width="50"></el-table-column>
    <el-table-column prop="sales" label="売上" min-width="50"></el-table-column>
  </el-table>

</div>
</template>

<script>
import { fetchOrdersAggregation } from '@/api'
import { handleErrMixin } from '../mixins'

export default {
  mixins: [handleErrMixin],

  created () {
    this.fetchAggregations()
  },

  data () {
    return {
      dateRange: [new Date(2017, 10, 24, 0, 0), new Date(2017, 10, 27, 0, 0)],
      results: []
    }
  },

  methods: {
    async fetchAggregations () {
      try {
        this.results = await fetchOrdersAggregation(this.dateRange[0], this.dateRange[1])
      } catch (e) {
        this.handleErr(e)
      }
    }
  }
}
</script>
