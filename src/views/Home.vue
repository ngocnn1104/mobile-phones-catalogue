<template>
  <div class="home">
    <PhonesGrid v-if="loading" :loading="true" class="mt-4" />

    <div v-else>
      <PhonesGrid
        v-if="selectedBrand === null"
        :phones-list="topPhones"
        class="mt-4"
      />

      <PhonesGrid v-else :phones-list="phonesByBrand" class="mt-4" />
      <v-pagination
        :value="phonesByBrand.current_page"
        :length="phonesByBrand.last_page"
        @input="onChangePage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

import PhonesGrid from "@/components/PhonesGrid";

export default {
  name: "Home",

  components: { PhonesGrid },

  data() {
    return {
      topPhones: {
        title: "",
        data: [],
      },
      phonesByBrand: {
        current_page: 1,
        last_page: 1,
      },
      loading: false,
    };
  },

  computed: {
    ...mapState(["brands", "selectedBrand"]),
    ...mapGetters(["filteredBrands"]),
  },

  watch: {
    selectedBrand: {
      immediate: true,
      handler(value) {
        if (value === null) {
          this.getTopPhones();
        } else {
          this.onChangePage(1);
          this.getPhonesByBrand();
        }
      },
    },
  },

  async created() {
    if (this.brands.data.length < 1) {
      const res = await this.$api.get("/brands");
      this.setBrands(res.data);
    }
  },

  methods: {
    ...mapMutations(["setBrands"]),

    async getTopPhones() {
      if (this.topPhones.data.length < 1) {
        this.loading = true;
        const res = await this.$api.get("/latest");
        this.topPhones = {
          ...res.data,
          phones: res.data.phones.slice(0, 6),
        };
        this.loading = false;
      }
    },

    async getPhonesByBrand() {
      this.loading = true;
      const res = await this.$api.get(
        `/brands/${this.filteredBrands[this.selectedBrand].brand_slug}?page=${
          this.phonesByBrand.current_page
        }`
      );
      this.phonesByBrand = { ...res.data };
      this.loading = false;
    },

    onChangePage(page) {
      this.phonesByBrand.current_page = page;
      this.getPhonesByBrand();
    },
  },
};
</script>
