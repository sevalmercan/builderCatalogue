<template>
    <div class="layout">
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>

        <div class="main-page">
            <nav-bar />
            <div class="content" v-if="!isLoading">
                <router-view />
            </div>
        </div>
        <div class="main-footer">
            <img src="../assets/images/footer.png" alt="Footer bricks">
        </div>
    </div>
</template>
<script>

import navBar from '@/components/navBar.vue';
import axios from 'axios'
import { bricksStore } from "../common/store"
import bricksMixin from '@/common/bricksMixin.vue';
export default {
    name: "HomeView",
    mixins: [bricksMixin],
    data() {
        return {
            isLoading: true
        }
    },
    components: {
        navBar
    },
    async mounted() {
        const currentUserId = localStorage.getItem('userId')

        axios
            .get(`https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/${currentUserId}`)
            .then(response => (bricksStore.userInventory = response.data))

        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/users')
            .then(response => (bricksStore.allUsers = response.data.Users))

        await axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/sets')
            .then(response => (bricksStore.sets = response.data.Sets));

        await this.getAllUsersInventory()
        await this.addDetailsToAllSets()
        this.configureInitialSet()
        this.isLoading = false
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
            padding-bottom: 4.8rem;
        }
    }

    .main-footer {
        position: fixed;
        bottom: -20px;
        width: 100%;

        img {
            object-fit: cover;
            max-height: 70px;
            width: 100%;
        }
    }
}
</style>
  