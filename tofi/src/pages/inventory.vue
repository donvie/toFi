<template>
  <q-page class="q-ma-md">
    <q-breadcrumbs class="text-grey">
      <q-breadcrumbs-el label="Store" icon="store" />
      <q-breadcrumbs-el label="Inventory" icon="inventory" />
    </q-breadcrumbs>


    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-xs">
      <div class="col-xs-6 col-sm-4 col-md-3" v-for="product in products" :key="product._id">
        <q-card
          style="width: auto"
        >
          <q-img
            :src="product.image"
          />
          <q-card-section>
            <div class="row items-center" style="padding-top:10px">
              <div class="col-12 text-body1 text-bold ellipsis">{{product.product_name}}</div>
              <div class="col-12 text-grey">{{product.regular_price}}</div>
              <div class="col-12 text-grey">Stocks Left: {{product.stock}}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="around">
            <ViewProduct :product="product" />
            <q-btn flat round icon="edit" dense color="primary" v-close-popup />
            <q-btn
              flat
              round
              icon="delete"
              @click="deleteProduct(product._id)"
              dense
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3">
        <AddProduct />
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import AddProduct from "./inventory/addProduct.vue";
import ViewProduct from "./inventory/viewProduct.vue";
export default {
  components: {
    AddProduct,
    ViewProduct
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    deleteProduct: function(x) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to delete this product?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$axios.get(this.$appLink + "/DeleteProduct?id=" + x);
          this.$router.go()
        });
    }
  },
  mounted() {
    this.$axios.get(this.$appLink + "/products").then(results => {
      this.products = results.data.data;
    });
  }
};
</script>
