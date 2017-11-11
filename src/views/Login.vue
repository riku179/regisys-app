<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form ref="login-form" :model="loginForm" labelPosition="top" label-width="120px">
            <el-form-item label="ユーザー名">
              <el-input placeholder="username" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="パスワード">
              <el-input placeholder="******" v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login(loginForm)">ログイン</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as api from '../api'
import * as lib from '../lib/auth'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    async login (loginForm) {
      try {
        let data = await api.fetchToken(loginForm.username, loginForm.password)
        lib.setAuthData(data)
        this.$router.push('/home')
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>
