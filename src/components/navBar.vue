<template>
    <b-navbar class="main-nav">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/images/brick-logo.png" alt="Lego Logo">
            </b-navbar-item>
        </template>
        <template #start>
            <router-link to="/my-inventory">
                <b-navbar-item>
                    <b-button rounded outlined size="is-small">
                        My Inventory</b-button>
                </b-navbar-item>
            </router-link>
            <router-link to="/lego-sets"> <b-navbar-item>
                    <b-button rounded outlined size="is-small">
                        Collections
                    </b-button>
                </b-navbar-item></router-link>
        </template>
    </b-navbar>
</template>
  
<script>

export default {
    name: "navBar",
};
</script>
  
<style lang="scss" scoped >
@import '../assets/style/color.scss';

.main-nav {
    background: $main-page-bg;
    padding: 0 30px !important;
    color: $primar-text-color;
    margin-top: 15px;
}

::v-deep .button.is-small {
    border-width: 2px;
    background: $button-bg;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 1.2rem 1.8rem;
}

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