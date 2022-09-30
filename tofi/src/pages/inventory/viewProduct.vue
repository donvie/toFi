<template>
    <div>
        <q-btn flat round icon="remove_red_eye" @click="opened=true" dense color="primary" v-close-popup />
        <q-dialog v-model="opened">
      <q-card>
        <q-img :src="product.image" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{product.product_name}}</div>
      
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle1">${{product.regular_price}}</div>
          <div class="text-subtitle2 text-grey">{{product.description}}</div>
          <div class="text-subtitle2 text-grey"><b>Stock Left: </b>{{product.stock}}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
            <barcode width="2px"  height="25px" :value="product.barcode" font-options="bold">Unable to generate barcode.</barcode>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import VueBarcode from "vue-barcode";
export default {
    props: ['product'],
     components: {
    barcode: VueBarcode
  },
    data(){
        return{
            opened: false
        }
    }
}
</script>

<style>

</style>
