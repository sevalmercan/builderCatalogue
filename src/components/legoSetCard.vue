<template>
    <div class="set-card-wrapper">
        <div class="lego-set-card">

            <img :src="getSetImage(name)" alt="Lego Set">

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
import legoMixin from '@/common/legoMixin.vue';

export default {
    mixins: [legoMixin],
    props: {
        name: String,
        setNumber: String,
        totalPieces: Number
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




.set-card-wrapper {
    color: $primar-text-color;
    width: 100%;

    .lego-set-card {

        margin-right: 8px;
        margin-bottom: 1.2rem;
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

    .lego-set-card>div {
        display: flex;
        justify-content: center;
    }
}
</style>