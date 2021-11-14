<template>
  <v-container>
    <h3 class="mb-4 text-uppercase d-flex align-center">
      <v-icon class="me-2" color="info">mdi-information</v-icon>
      {{ phoneSpecs.title }}
    </h3>
    <div class="specs-container pa-5">
      <v-row
        v-for="(spec, index) in phoneSpecs.specs"
        :key="`${phoneSpecs.title}-${index}`"
        align="center"
      >
        <v-col :cols="3">
          {{ spec.key }}
        </v-col>
        <v-col :cols="9">
          <span v-if="spec.val.length < 2">
            {{ spec.val[0] }}
          </span>
          <ul v-else>
            <li
              v-for="(specVal, specValIndex) in spec.val"
              :key="`${phoneSpecs.title}-${index}-${specValIndex}`"
            >
              {{ specVal }}
            </li>
          </ul>
        </v-col>
        <v-col v-if="index < phoneSpecs.specs.length - 1" cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    phoneSpecs: {
      type: Object,
      default: () => ({
        title: "",
        specs: [],
      }),
    },
  },
};
</script>

<style lang="scss">
.specs-container {
  background-color: rgba(189, 208, 233, 0.2);
  border-radius: 12px;
}
</style>
