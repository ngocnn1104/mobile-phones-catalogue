<template>
  <div>
    <div v-if="loading">
      <v-skeleton-loader
        type="heading"
        style="max-width: 400px"
        class="mx-auto heading-skeleton"
      />
      <v-container>
        <v-row dense>
          <v-col v-for="i in 3" :key="i" :sm="12" :md="4" class="pa-4">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <h2 class="text-center text-uppercase">
        {{ phonesList.title }}
      </h2>

      <v-container>
        <v-row dense>
          <v-col
            v-for="phone in phonesList.phones"
            :key="phone.slug"
            :sm="12"
            :md="4"
            class="pa-4"
          >
            <PhoneCard :phone-details="phone" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import PhoneCard from "./PhoneCard";

export default {
  props: {
    phonesList: {
      type: Object,
      default: () => ({ title: "", phones: [] }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  components: { PhoneCard },
};
</script>

<style lang="scss">
.heading-skeleton {
  .v-skeleton-loader__heading {
    width: 100%;
  }
}
</style>
