<template>
  <el-container>
    <el-aside width="150px">
      <el-menu :router="true" :default-active="activeLink">
        <template v-for="rule in $router.options.routes[0].children" v-if="rule.meta && (!rule.meta.staff_only || user.is_staff)">
          <el-menu-item :index="rule.path" :key="rule.key">
            <i :class="rule.meta.icon"></i>
            <span class="menu-item">{{ rule.meta.title }}</span>
          </el-menu-item>
        </template>
        <el-menu-item index="/logout">
          <i class="el-icon-remove-outline"></i>
          <span class="menu-item">Logout</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { getUserData } from '@/lib/auth'
export default {
  beforeCreated () {
    let match = _.chain(this.$route.matched).sortBy(n => n.path.length).last().value()
    this.activeLink = match.path
  },

  data () {
    return {
      activeLink: null,
      user: getUserData()
    }
  }
}
</script>

<style>
  h2 {
    color: #7f7f7f;
    font-weight: 300;
    margin-top: auto;
  }
  h1 {
    color: #7f7f7f;
    font-weight: 300;
    margin: auto;
  }
  span.menu-item {
    color: #7f7f7f;
  }
</style>
