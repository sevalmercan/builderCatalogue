<template>
    <div class="inventory">
        <legoCard />
    </div>
</template>
<script>

import legoCard from '@/components/legoCard.vue';
import legoMixin from '@/common/legoMixin.vue';

export default {
    name: "HomeView",
    mixins: [legoMixin],
    components: {
        legoCard
    },
    created() {
        console.log(this.userInventory)
    }
};
</script>
<style lang="scss" scoped >
.inventory {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>