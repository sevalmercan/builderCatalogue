<template>
    <div class="set-card-wrapper">
        <div class="bricks-set-card" :class="{ active: isSelected }">

            <img :src="getSetImage(name)" alt="Set">

            <div class="info">
                <div class="info-wrapper">
                    <p class="info-title">Name</p>
                    <p class="info-result"> {{ getName(name) }} </p>

                </div>
                <div class="info-wrapper">
                    <p class="info-title"> Set Number</p>
                    <p class="info-result">
                        {{ setNumber }}
                    </p>

                </div>
                <div class="info-wrapper">
                    <p class="info-title"> Total Pieces</p>
                    <p class="info-result"> {{ totalPieces }}</p>

                </div>
            </div>

        </div>


    </div>
</template>
  
<script>
import bricksMixin from '@/common/bricksMixin.vue';

export default {
    mixins: [bricksMixin],
    props: {
        name: String,
        setNumber: String,
        totalPieces: Number,
        isSelected: Boolean
    },
    methods: {
        getSetImage(setName) {
            return require(`../assets/images/setImages/${setName}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.active {
    border: 4px dashed #8d96c4c2 !important;
}

.set-card-wrapper {
    color: $primar-text-color;
    width: 100%;
    cursor: pointer;


    .bricks-set-card {

        margin-right: 8px;
        border-radius: 6px;
        overflow: hidden;
        color: $primar-text-color;
        border: $border-bg solid;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        min-width: 430px;
        padding: 2rem;
        align-items: center;



        &:hover {
            box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
        }

        img {
            width: 230px;
            object-fit: contain;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 230px;

            .info-wrapper {
                margin-bottom: 15px;
                border-bottom: $border-bg solid;

                .info-title {
                    color: #B2B2B2;
                    font-size: 1rem;
                    margin-bottom: 0.85rem;
                }

                .info-result {
                    font-size: 1.12rem;
                    padding-bottom: 10px;
                }
            }

        }

    }

    .bricks-set-card>div {
        display: flex;
        justify-content: center;
    }
}
</style>