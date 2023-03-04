<template>
    <div class="inventory">
        <div class="total-brick">
            <h1 class="title">Total Brick : {{ userInventory.brickCount }} </h1>
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
@import '../assets/style/color.scss';

.inventory {
    display: flex;
    flex-direction: column;


    .total-brick {
        display: flex;
        justify-content: center;

        .title {
            color: $primar-text-color !important;
        }
    }

    .inventory-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

}
</style>