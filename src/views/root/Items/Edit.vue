<template>
  <div class="context">
    <h2>商品編集</h2>
    <el-form ref="itemForm" :model="formVal" :rules="validationRules" label-width="100px">
      <el-form-item :label="formLabel.id">
        <el-input v-model="formVal.id" disabled></el-input>
      </el-form-item>
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
          <p>この内容に変更しますか？</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">適用</el-button>
          <el-button @click="check(false)">戻る</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { fetchItem, updateItem } from '@/api'
import { formMixin } from './itemMixins'
import { handleErrMixin } from '../mixins'
import { getUserData } from '@/lib/auth'

export default {
  mixins: [handleErrMixin, formMixin],

  async created () {
    if (!this.$route.params.id) {
      this.$router.push('/home')
      return
    }
    await this.fillForm(this.$route.params.id)
  },

  data () {
    return {
      userData: getUserData()
    }
  },

  methods: {
    async fillForm (id) {
      try {
        let data = await fetchItem(id)
        if (data.owner.id !== this.userData.id) {
          this.$router.push('/home')
          this.$message.error('権限がありません')
        }
        this.formVal = _.pick(data, ['id', 'name', 'price', 'member_price', 'quantity'])
      } catch (e) {
        this.handleErr(e)
      }
    },

    async submit () {
      try {
        await updateItem(this.formVal.id, _.assign(this.formVal, { owner: this.userData.id }))
        this.fillForm(this.formVal.id)
        this.check(false)
        this.$message('変更が適用されました')
      } catch (e) {
        this.handleErr(e)
      }
    }
  }
}
</script>
