<template>
    <b-navbar class="main-nav">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/images/brick-logo.png" alt="Logo">
            </b-navbar-item>
        </template>

        <template #start>
            <router-link to="my-inventory">
                <b-navbar-item>
                    <b-button rounded outlined size="is-small" :class="{ active: currentRoute() === 'my-inventory' }">
                        <b-icon class="nav-icon" pack="fas" icon="fa-sharp fa-solid fa-briefcase" size="is-small">
                        </b-icon> My Inventory</b-button>
                </b-navbar-item>
            </router-link>
            <router-link to="bricks-sets"> <b-navbar-item>
                    <b-button rounded outlined size="is-small" :class="{ active: currentRoute() === 'bricks-sets' }">
                        <b-icon class="nav-icon" pack="fas" icon="fas fa-th-list" size="is-small" />
                        Collections
                    </b-button>
                </b-navbar-item></router-link>
            <router-link to="custom-build"> <b-navbar-item>
                    <b-button rounded outlined size="is-small" :class="{ active: currentRoute() === 'custom-built' }">
                        <b-icon class="nav-icon" pack="fas" icon="fas fa-th-list" size="is-small" />
                        Custom Build
                    </b-button>
                </b-navbar-item></router-link>
        </template>
    </b-navbar>
</template>
  
<script>
import bricksMixin from '@/common/bricksMixin.vue';
export default {
    mixins: [bricksMixin],
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

    .active {
        background-color: $button-bg !important;
    }

    .nav-icon {
        margin-right: 0.1rem !important;
    }
}

::v-deep .navbar-item:focus-within {
    background: transparent;
}

::v-deep .navbar-item:hover {
    background: transparent;
}

::v-deep .button.is-outlined:focus {
    background-color: $button-bg ;
}

::v-deep .button.is-small {
    border-width: 2px;
    background: transparent;
    border: none;
    font-size: 1rem;
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