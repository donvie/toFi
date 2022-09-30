<template>
  <q-page padding>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="capture" size="xl" round color="primary" icon="photo_camera" />
    </q-page-sticky>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  methods: {
    capture () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert('We got a barcode\n' + 'Result: ' + result.text + '\n' + 'Format: ' + result.format + '\n' + 'Cancelled: ' + result.cancelled)
        },
        function (error) {
          alert('Scanning failed: ' + error)
        }
      )
    }
  }
}
</script>
