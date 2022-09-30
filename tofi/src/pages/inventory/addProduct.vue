<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[2, 2]">
      <q-btn @click="opened=true" round color="primary" flat size="42px" icon="add" />
    </q-page-sticky>

    <q-dialog v-model="opened">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">Add Product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row">
          <div class="col-12">
            <br />
          </div>
          <div class="col-12 row">
            <q-input
              class="col-6 q-pr-sm"
              square
              outlined
              dense
              stack
              label="Product Name"
              ref="inp_product_name"
              v-model="product_name"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
              counter
            />
            <q-input
              class="col-6 q-pr-sm"
              square
              outlined
              dense
              stack
              label="Brand Name"
              ref="brandName"
              v-model="brandName"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
              counter
            />
            <q-input
              class="col-6"
              v-model="barcode"
              ref="inp_SKU"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
              square
              outlined
              dense
              stack
              label="Barcode"
            />
            <q-input
              class="col-6 q-pl-sm"
              v-model="image"
              square
              outlined
              dense
              :rules="[ val => val.trim()!='' || 'Required']"
              stack
              label="Image"
            />
            <q-input
              class="col-12 q-pt-sm"
              type="textarea"
              square
              outlined
              dense
              stack
              label="Description"
              v-model="description"
              ref="inp_description"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
            />
            <q-input
              class="col-12 q-pt-sm"
              type="text"
              square
              outlined
              dense
              stack
              label="Tags"
              v-model="tags"
            />
            <q-input
              class="col-4 q-pt-sm q-pr-sm"
              square
              outlined
              dense
              stack
              label="Regular Price"
              v-model="regular_price"
              ref="inp_regular_price"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
            />
            <q-input
              class="col-4 q-pt-sm q-pr-sm"
              square
              outlined
              dense
              stack
              label="Sale Price"
              v-model="sale_price"
              :rules="[]"
              lazy-rules
            />
            <q-input
              class="col-4 q-pt-sm"
              square
              outlined
              dense
              stack
              label="Stock On Hand"
              v-model="stock"
              ref="inp_stock"
              :rules="[ val => val.trim()!='' || 'Required']"
              lazy-rules
            />
            <!-- <div class="col-4">
              <p class="text-title text-bold text-grey">Add Product Photos</p>
              <div class="flex q-gutter-md" align="center">
                <q-card
                  flat
                  bordered
                  style="min-width:154px;max-width:154px;min-height:152px;max-height:152px;cursor:pointer"
                >
                  <q-icon name="add" size="150px" color="grey" />
                </q-card>
              </div>
            </div> -->
            <q-card class="col-8" flat bordered>
              <q-card-section class="row">
                <p class="col-6 text-title text-bold text-grey">Pre Order</p>

                <q-btn-toggle
                  class="col-6"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  toggle-color="grey"
                  color="white"
                  text-color="grey"
                  v-model="pre_order"
                  :options="[
                                {label: 'Yes', value: true},
                                {label: 'No', value: false}
                            ]"
                />
              </q-card-section>
              <q-card-section class="row">
                <p class="col-6 text-title text-bold text-grey">Delivery Services</p>

                <q-btn-toggle
                  class="col-6"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  toggle-color="grey"
                  color="white"
                  text-color="grey"
                  v-model="delivery_services"
                  :options="[
                                {label: 'Yes', value: true},
                                {label: 'No', value: false}
                            ]"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Save" @click="save" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      product_name: "",
      barcode: "",
      tags: "",
      image: "",
      description: "",
      regular_price: "",
      sale_price: "",
      stock: "",
      pre_order: true,
      delivery_services: true,
      brandName: ""
    };
  },
  
  methods: {
    save: async function() {
    this.$axios.post(this.$appLink+"/AddProduct",{
        product_name: this.product_name,
        barcode: this.barcode,
        description: this.description,
        regular_price: this.regular_price,
        sale_price:this.sale_price,
        stock: this.stock,
        pre_order: this.pre_order,
        delivery_services: this.delivery_services,
        brandName: this.brandName,
        image: this.image,
        tags: this.tags,
        store: {
        "store_name": "Tindahan ni Inday",
        "coordinates": {
        "latitude": 14.5561234,
        "longitude": 121.0530477
        },
        "address": "38th St, Taguig, Metro Manila",
        "picture": "",
        "link": "https://www.google.com/maps/place/Tim+Hortons/@14.5570497,121.054721,18z/data=!3m1!5s0x3397c8f50358a449:0x5607c5cf1cccbb29!4m5!3m4!1s0x3397c8f598406f31:0xdf7f108de88cb282!8m2!3d14.5559768!4d121.0543645"
        }
    }).then(result=>{
        this.opened=false
        this.$router.go() 
    })
    },
    validate: async function() {
      var validation = [];
      validation[0] = await this.$refs.inp_product_name.validate();
      validation[1] = await this.$refs.inp_description.validate();
      validation[2] = await this.$refs.inp_regular_price.validate();
      validation[3] = await this.$refs.inp_stock.validate();
      return validation.includes(false);
    }
  }
};
</script>

<style>
</style>
