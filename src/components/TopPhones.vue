<template>
  <div>
    <PhonesGrid
      v-for="(phonesList, index) in topPhones"
      :key="index"
      :phones-list="phonesList"
      class="mt-4"
    />
  </div>
</template>

<script>
import PhonesGrid from "./PhonesGrid";

export default {
  props: {
    topPhones: {
      type: Array,
      required: true,
    },
  },

  components: { PhonesGrid },
};
</script>

<style></style>
