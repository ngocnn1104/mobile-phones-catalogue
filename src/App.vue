<template>
  <v-app>
    <v-navigation-drawer v-model="showDrawer" app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn icon @click="showDrawer = !showDrawer" class="me-2">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        Mobile Mart
      </div>

      <v-spacer></v-spacer>

      <v-btn to="" text>
        <v-icon>mdi-cart</v-icon>
        <span class="ms-2">Cart</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    showDrawer: null,
  }),
};
</script>
