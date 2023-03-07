<template>
    <div class="layout">
        <div class="main-page">
            <nav-bar />
            <div class="content">
                <router-view />
            </div>
        </div>
        <div class="main-footer">
            <img src="../assets/images/footer.png" alt="Lego Header">
        </div>
    </div>
</template>
<script>

import navBar from '@/components/navBar.vue';
import axios from 'axios'
import { legoStore } from "../common/store"
import legoMixin from '@/common/legoMixin.vue';
export default {
    name: "HomeView",
    mixins: [legoMixin],

    components: {
        navBar
    },
    async mounted() {
        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc')
            .then(response => (legoStore.userInventory = response.data))

        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/users')
            .then(response => (legoStore.allUsers = response.data.Users))

        await axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/sets')
            .then(response => (legoStore.sets = response.data.Sets));

        await this.getAllUsersInventory()
        await this.addDetailsToAllSets()
        this.configureInitialSet()
        console.log(this.sets)


    }
};
</script>
  
<style lang="scss" scoped >
@import '../assets/style/color.scss';

.layout {
    overflow: hidden;
    background: $layout-bg;


    .main-page {
        margin: 30px 50px;
        overflow: hidden;
        background: $main-page-bg;
        border-radius: 50px;

        .content {
            padding: 30px;
        }
    }

    .main-footer {
        position: fixed;
        bottom: -20px;
        width: 100%;
    }
}
</style>
  