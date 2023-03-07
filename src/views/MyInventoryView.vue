<template>
    <div class="inventory">
        <div class="total-brick">
            <div class="title">Total Brick: {{ userInventory.brickCount }} </div>
            <div class="title"> Total Pack: {{ userInventory.collection.length }} </div>
        </div>
        <div class="inventory-cards">
            <div v-for="piece in collection" :key="piece.pieceId">
                <legoCard :pieceId="piece.pieceId" :variants="piece.variants" />
            </div>
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
    computed: {
        collection() {
            return this.userInventory.collection;
        }
    }
};
</script>
<style lang="scss" scoped >
@import '../assets/style/color.scss';

.inventory {
    display: flex;
    flex-direction: column;


    .total-brick {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1.5rem;
        margin-left: 4.1rem;

        .title {
            color: $primar-text-color !important;
            font-size: 1rem;
            margin: 0 10px;
        }
    }

    .inventory-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 1.1rem;
        row-gap: 1.1rem;
    }

}
</style>