<template>
    <div class="layout">
        <div class="main-page">
            <nav-bar />
            <div class="content">
                <router-view />
            </div>
            <div class="main-footer">
                <img src="../assets/images/footer.png" alt="Lego Header">
            </div>
        </div>
    </div>
</template>
<script>

import navBar from '@/components/navBar.vue';
import axios from 'axios'
import { legoStore } from "../common/store"
export default {
    name: "HomeView",

    components: {
        navBar
    },
    mounted() {
        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc')
            .then(response => (legoStore.userInventory = response.data))

        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/users')
            .then(response => (legoStore.allUsers = response.data.Users))
    }
};
</script>
  
<style lang="scss" scoped >
@import '../assets/style/color.scss';

.layout {
    overflow: hidden;
    background: $layout-bg;


    .main-page {
        margin: 50px;
        overflow: hidden;
        background: $main-page-bg;
        border-radius: 50px;

        .content {
            padding: 30px;
        }

        .main-footer {
            position: fixed;
            bottom: -6px;
            width: 100%;
        }
    }
}
</style>
  