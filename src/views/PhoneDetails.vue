<template>
  <div class="about">
    <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>

    <div v-else-if="phoneDetailsAvailable">
      <v-container fluid>
        <v-row>
          <v-col :sm="12" :md="6">
            <v-carousel v-model="carousel" cycle height="450px">
              <v-carousel-item
                v-for="(image, i) in phoneDetails.phone_images"
                :key="i"
              >
                <v-img :src="image" height="400px" contain />
              </v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col :sm="12" :md="6">
            <h3 class="my-4">{{ phoneDetails.brand }}</h3>
            <h1>{{ phoneDetails.phone_name }}</h1>
            <v-chip large label outlined color="error" class="my-4">
              <span class="phone-price">$ 1 500,00</span>
            </v-chip>
            <ul>
              <li class="my-2">{{ phoneDetails.release_date }}</li>
              <li class="my-2">{{ phoneDetails.dimension }}</li>
              <li class="my-2">{{ phoneDetails.os }}</li>
              <li class="my-2">{{ phoneDetails.storage }}</li>
            </ul>

            <div class="d-flex align-center my-4">
              <v-text-field
                v-model="quantity"
                append-outer-icon="mdi-plus"
                prepend-icon="mdi-minus"
                type="number"
                outlined
                readonly
                hide-details
                dense
                style="max-width: 200px"
                @click:append-outer="incrementQuantity"
                @click:prepend="decreaseQuantity"
              ></v-text-field>
              <v-btn color="primary" class="ms-3" dark @click="addToCart">
                <v-icon class="me-2">mdi-cart</v-icon>
                Add to Cart
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            :sm="12"
            :md="6"
            v-for="(phoneSpecs, index) in phoneDetails.specifications"
            :key="`spec-${index}`"
          >
            <PhoneSpecs :phone-specs="phoneSpecs" class="my-4" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <p v-else class="text-center mt-5">Cannot find phone information.</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import PhoneSpecs from "@/components/PhoneSpecs";

export default {
  components: {
    PhoneSpecs,
  },

  data() {
    return {
      phoneDetails: {},
      loading: false,
      carousel: 0,
      quantity: 1,
    };
  },

  computed: {
    phoneDetailsAvailable() {
      return Object.keys(this.phoneDetails).length > 0;
    },
  },

  async created() {
    const { slug } = this.$route.params;
    if (slug) {
      this.loading = true;
      const res = await this.$api.get(`/${slug}`);
      this.phoneDetails = {
        ...res.data,
      };
      this.loading = false;
    }
  },

  methods: {
    ...mapMutations(["updateCart"]),

    incrementQuantity() {
      this.quantity += 1;
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },

    addToCart() {
      this.updateCart({
        phone_name: this.phoneDetails.phone_name,
        image: this.phoneDetails.thumbnail,
        slug: this.$route.params.slug,
        quantity: this.quantity,
      });
    },
  },
};
</script>

<style lang="scss">
.phone-price {
  font-size: 30px;
  font-weight: bold;
}
</style>
