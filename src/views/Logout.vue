<template>
</template>

<script>
import { removeToken } from '@/lib/auth'
export default {
  beforeMount () {
    removeToken()
    this.$router.push('/login')
  }
}
</script>
