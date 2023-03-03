<template>
    <div class="inventory">
        <legoCard />
    </div>
</template>
<script>

import legoCard from '@/components/legoCard.vue';

export default {
    name: "HomeView",
    components: {
        legoCard
    },
};
</script>
<style lang="scss" scoped >
.inventory {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>