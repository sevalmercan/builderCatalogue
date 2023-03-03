<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/images/LegoLogo.png" alt="Lego Logo">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">
        <b-button rounded outlined size="is-medium" type="is-info is-light"> My Inventory</b-button>
      </b-navbar-item>
      <b-navbar-item href="#">
        <b-button rounded outlined size="is-medium" type="is-info is-light"> Lego Sets</b-button>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-info">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>

export default {
  name: "HomeView",
  components: {

  },
};
</script>

<style lang="scss" scoped >
::v-deep .navbar-item img {
  max-height: 4.2rem;
}

::v-deep .navbar-start {
  display: flex;
  margin: auto;
}

::v-deep .navbar-end {
  margin-left: 0;
}
</style>