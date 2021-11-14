<template>
  <v-app>
    <NavigationDrawer v-if="$route.path === '/'" ref="navigationDrawer" />

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn
          v-if="$route.path === '/'"
          icon
          @click="$refs.navigationDrawer.toggleDrawer()"
          class="me-2"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <router-link to="/" class="app-name"> Mobile Mart </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/cart" text>
        <v-badge color="error" :value="cartCount" :content="cartCount">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <span class="ms-2">Cart</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: { NavigationDrawer },

  computed: {
    ...mapGetters(["cartCount"]),
  },
};
</script>

<style lang="scss">
.app-name {
  color: white !important;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 25px;
}
</style>
