<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto py-4" :elevation="hover ? 16 : 2">
      <v-img :src="phoneDetails.image" contain height="200px"> </v-img>

      <v-card-text class="text--primary text-center font-weight-bold">
        {{ phoneDetails.phone_name }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" text dark @click="addToCart">
          <v-icon class="me-2">mdi-cart</v-icon>
          Add to Cart
        </v-btn>

        <v-btn color="orange" text dark :to="`/details/${phoneDetails.slug}`">
          <v-icon class="me-2">mdi-cellphone-information</v-icon>
          Explore
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    phoneDetails: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations(["updateCart"]),

    addToCart() {
      this.updateCart({
        phone_name: this.phoneDetails.phone_name,
        image: this.phoneDetails.image,
        slug: this.phoneDetails.slug,
        quantity: 1,
      });
    },
  },
};
</script>

<style></style>
