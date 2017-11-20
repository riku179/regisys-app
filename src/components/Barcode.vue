<template>
  <svg :id="'barcode-' + value "></svg>
</template>

<script>
import * as JsBarcode from 'jsbarcode'

export default {
  props: ['value'],
  name: 'barcode',
  mounted () {
    JsBarcode('#barcode-' + this.value, this.value)
  }
}
</script>
