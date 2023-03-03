<template>
    <div class="inventory">
        <div v-for="piece in collection" :key="piece.pieceId">
            <legoCard :pieceId="piece.pieceId" :variants="piece.variants" />
        </div>
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
    },
    computed: {
        collection() {
            return this.userInventory.collection;
        }
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