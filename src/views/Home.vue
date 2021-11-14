<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Home",

  async created() {
    const res = await this.$api.get("/brands");
    console.log(res);
  },
};
</script>
