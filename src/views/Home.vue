<template>
    <div>
        <nav-bar />
        <div class="content">
            <router-view />
        </div>
        <div class="main-footer">
            <img src="../assets/images/footer.png" alt="Lego Header">
        </div>
    </div>
</template>
<script>

import navBar from '@/components/navBar.vue';
import axios from 'axios'
export default {
    name: "HomeView",
    components: {
        navBar
    },
    data() {
        return {
            userInventory: []
        }
    }, mounted() {
        axios
            .get('https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc')
            .then(response => (this.userInventory = response))
    }
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
  