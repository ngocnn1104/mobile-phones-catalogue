<template>
  <v-container>
    <v-row>
      <v-col :sm="12" :md="9">
        <h1>Cart ({{ cartCount }})</h1>
        <v-data-table
          class="cart-table"
          :headers="headers"
          hide-default-footer
          :items="cart"
        >
          <template #item.phoneModel="{ item }">
            <div class="d-flex align-center py-3">
              <div style="width: 50px" class="me-3">
                <v-img :src="item.image" height="80px" contain></v-img>
              </div>

              {{ item.phone_name }}
            </div>
          </template>

          <template #item.unitPrice> $ 1,500 </template>

          <template #item.subtotal="{ item }">
            $ {{ (1500 * item.quantity).toLocaleString() }}
          </template>
        </v-data-table>
      </v-col>

      <v-col :sm="12" :md="3">
        <div class="right-container">
          <h4 class="mb-2">
            <v-icon class="me-2">mdi-ticket-percent</v-icon>
            Discount Codes
          </h4>
          <v-chip
            class="me-2"
            :outlined="discountRate !== 0.25"
            :color="discountRate === 0.25 ? 'primary' : ''"
            :dark="discountRate === 0.25"
            @click="selectDiscountRate(0.25)"
          >
            25% OFF
          </v-chip>
          <v-chip
            :outlined="discountRate !== 0.5"
            :color="discountRate === 0.5 ? 'primary' : ''"
            :dark="discountRate === 0.5"
            @click="selectDiscountRate(0.5)"
          >
            50% OFF
          </v-chip>
        </div>

        <div class="right-container">
          <h4 class="mb-2">
            <v-icon class="me-2">mdi-currency-usd</v-icon>
            Amount
          </h4>
          <v-row>
            <v-col>Subtotal:</v-col>
            <v-col class="text-right">$ {{ subtotal.toLocaleString() }}</v-col>
          </v-row>
          <v-row>
            <v-col>Discount:</v-col>
            <v-col class="text-right">
              - $ {{ discountValue.toLocaleString() }}
            </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col>Total:</v-col>
            <v-col class="text-right">$ {{ total.toLocaleString() }}</v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      all: false,
      discountRate: 0,
    };
  },

  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartCount"]),

    headers() {
      return [
        {
          text: "Phone Model",
          value: "phoneModel",
          sortable: false,
        },
        {
          text: "Unit Price",
          value: "unitPrice",
          sortable: false,
          align: "right",
        },
        {
          text: "Quantity",
          value: "quantity",
          sortable: false,
          align: "right",
        },
        {
          text: "Subtotal",
          value: "subtotal",
          sortable: false,
          align: "right",
        },
      ];
    },

    subtotal() {
      return this.cart.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.quantity * 1500,
        0
      );
    },

    discountValue() {
      return this.subtotal * this.discountRate;
    },

    total() {
      return this.subtotal - this.discountValue;
    },
  },

  methods: {
    selectDiscountRate(rate) {
      if (this.discountRate !== rate) {
        this.discountRate = rate;
      } else {
        this.discountRate = 0;
      }
    },
  },
};
</script>

<style lang="scss">
.cart-table {
  td:nth-child(1) {
    max-width: 300px;
  }
}

.right-container {
  border: rgba(0, 0, 0, 0.12) thin solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
