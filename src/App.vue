<template>
  <div id="app">
    <div>
      <nav-bar />
      <div class="main-header">
        <img src="./assets/images/header.png" alt="Lego Header">
      </div>
      <div class="content">
        <router-view />
      </div>
      <div class="main-footer">
        <img src="./assets/images/footer.png" alt="Lego Header">
      </div>
    </div>

  </div>
</template>
<script>

import navBar from '@/components/navBar.vue';

export default {
  name: "HomeView",
  components: {
    navBar
  },
};
</script>

<style lang="scss" scoped >
.content {
  padding: 30px;
}

.main-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
