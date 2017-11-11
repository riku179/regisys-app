<template>
  <div class="context">
    <h2>新規出品</h2>
    <el-form ref="itemForm" :model="formVal" :rules="validationRules" label-width="100px">
      <el-form-item :label="formLabel.name" prop="name">
        <el-input v-model.trim="formVal.name" :disabled="checkState"></el-input>
      </el-form-item>
      <el-form-item :label="formLabel.price" prop="price">
        <el-input v-model.trim.number="formVal.price" :disabled="checkState"></el-input>
      </el-form-item>
      <el-form-item :label="formLabel.member_price" prop="price">
        <el-input v-model.trim.number="formVal.member_price" :disabled="checkState"></el-input>
      </el-form-item>
      <el-form-item :label="formLabel.quantity" prop="quantity">
        <el-input-number :min="1" v-model.number="formVal.quantity" :disabled="checkState"></el-input-number>
      </el-form-item>
      <el-form-item v-if="!checkState">
        <el-button type="primary" @click="checkValid('itemForm', check, true)">確認</el-button>
      </el-form-item>
      <template v-else>
        <el-form-item>
          <p>この内容で出品しますか？</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">出品</el-button>
          <el-button @click="check(false)">戻る</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { formMixin } from './itemMixins'
import { addItem } from '@/api'
import { getUserData } from '@/lib/auth'

export default {
  mixins: [formMixin],

  data () {
    return {
      userData: getUserData()
    }
  },

  methods: {
    async submit () {
      try {
        await addItem(_.assign(this.formVal, { owner: this.userData.id }))
        this.$message('出品しました')
        this.check(false)
        this.clearForm()
      } catch (e) {
        this.handleErr(e)
      }
    }
  }
}
</script>
