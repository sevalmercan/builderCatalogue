<template>
    <b-navbar class="main-nav">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/images/LegoLogo.png" alt="Lego Logo">
            </b-navbar-item>
        </template>
        <template #start>
            <router-link to="/my-inventory">
                <b-navbar-item>
                    <b-button rounded outlined size="is-medium" type="is-primary is-light"> My Inventory</b-button>
                </b-navbar-item>
            </router-link>
            <router-link to="/lego-sets"> <b-navbar-item>
                    <b-button rounded outlined size="is-medium" type="is-primary is-light">
                        Lego Sets
                    </b-button>
                </b-navbar-item></router-link>
        </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button rounded size="is-medium" type="is-primary "> Log in</b-button>

                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
  
<script>

export default {
    name: "navBar",
};
</script>
  
<style lang="scss" scoped >
.main-nav {
    padding: 0 30px !important;
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

::v-deep .button.is-medium {
    font-size: 1.12rem;
}
</style>