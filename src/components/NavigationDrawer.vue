<template>
  <v-navigation-drawer v-model="showDrawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon class="me-2">mdi-filter</v-icon>
          Filter by Brands ({{ filteredBrands.length }})
        </v-list-item-title>
        <v-text-field
          outlined
          dense
          :value="brands.query"
          clearable
          prepend-inner-icon="mdi-magnify"
          placeholder="Search by brand name"
          hide-details
          class="mt-3"
          @input="handleInputQuery"
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group :value="selectedBrand">
        <v-list-item
          v-for="(brand, index) in brandsWithSize"
          :key="brand.brand_id"
          @click="() => selectBrand(index)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ brand.brand_name }} ({{ brand.device_count }})
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item
        v-if="brandsWithSize.length < filteredBrands.length"
        @click="showMoreBrands"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-avatar>
              <v-icon>mdi-chevron-down</v-icon>
            </v-list-item-avatar>
            Show more ({{ filteredBrands.length - brandsWithSize.length }}
            left)
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    showDrawer: null,
  }),

  computed: {
    ...mapState(["brands", "selectedBrand"]),
    ...mapGetters(["brandsWithSize", "filteredBrands"]),
  },

  methods: {
    ...mapMutations([
      "setSelectedBrand",
      "incrementBrandsSize",
      "setBrandQuery",
    ]),

    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },

    selectBrand(brandIndex) {
      this.setSelectedBrand(brandIndex);
    },

    showMoreBrands() {
      this.incrementBrandsSize();
    },

    handleInputQuery(value) {
      this.setBrandQuery(value);
    },
  },
};
</script>

<style></style>
