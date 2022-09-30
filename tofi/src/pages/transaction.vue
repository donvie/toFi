<template>
  <q-page padding>
    <q-input
      v-model="barcode"
      ref="search_input"
      @blur="searchProduct"
      outlined
      label="Click and Scan the Barcode"
    />

    
    <q-card class="bg-grey-3 q-mt-md">
      <q-input dense class="q-ma-sm" readonly :value="current_item.barcode" label="Barcode" bordered />
      <q-input dense class="q-ma-sm" readonly :value="current_item.product_name" label="Product Name" bordered />
      <q-input dense class="q-ma-sm" readonly :value="current_item.regular_price" label="Regular Price" />
      <q-card-actions>
        <q-btn class="full-width" @click="proceedProduct" color="primary" label="PROCEED" />
      </q-card-actions>
    </q-card>

    <q-markup-table separator="cell" flat bordered class="q-mt-md">
      <thead>
        <tr>
          <th class="text-left">Barcode</th>
          <th class="text-left">Product Name</th>
          <th class="text-left">Regular Price</th>
          <th class="text-left">QTY</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" v-bind:key="index">
          <td class="text-left">{{item.barcode}}</td>
          <td class="text-left">{{item.product_name}}</td>
          <td class="text-right">{{item.regular_price}}</td>
          <td class="text-right"><input v-model="item.qty" /></td>
          <td>
            <q-btn icon="clear" color="red" @click="data.splice(index, 1)" flat />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="scanProduct" round color="primary" icon="crop_free" size="xl" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      barcode: "",
      current_item: {},
      data: [],
      splitterModel: 70
    };
  },
  methods: {
    searchProduct: function() {
      this.$axios.post(this.$appLink+"/FindProduct",{barcode: this.barcode.trim()}).then(result =>{
        if (result.data.length == 0) {
            this.$q.notify({
              message: "Item Not Found. Please try again.",
              icon: "clear",
              color: "red",
              position: "top-right"
            });
            this.barcode = "";
            this.current_item = {};
          } else {
            if (result.data[0]) {
              var item = this.data.find(item => item.barcode === this.barcode.trim())
              if (item === undefined) {
                result.data[0].qty = 1
                this.current_item = result.data[0];
                this.data.push(result.data[0]);
                this.barcode = "";
              } else {
                if (item.barcode == this.barcode.trim()) {
                  let index = this.data.findIndex(data => data.barcode === this.barcode.trim());
                  this.data[index].qty += 1
                  this.barcode = ""
                } else {
                  result.data[0].qty = 1
                  this.current_item = result.data[0];
                  this.data.push(result.data[0]);
                  this.barcode = "";
                }
              }
            }
          }
      })
    },
    scanProduct: function() {
      cordova.plugins.barcodeScanner.scan(
        (result) => {
          this.barcode = result.text
          this.searchProduct()
        },
        function (error) {
          alert('Scanning failed: ' + error)
        }
      )
    },
    proceedProduct () {
      this.$axios.post(this.$appLink+"/ProceedTransaction",{data: this.data}).then(result =>{
        this.$q.notify({
          message: "You have successfully added.",
          icon: "check",
          color: "positive",
          position: "top-right"
        });
      })
    }
  }
};
</script>

<style>
</style>

    