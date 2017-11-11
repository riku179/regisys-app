<template>
</template>

<script>
import { removeAuthData } from '@/lib/auth'
export default {
  beforeMount () {
    removeAuthData()
    this.$router.push('/login')
  }
}
</script>
