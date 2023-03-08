<template>
    <div class="lego-card">
        <div class="card-info">
            <div class="piece-id">
                <div class="piece-img">
                    <img src="../assets/images/piece-icon.png" alt="Lego Logo">

                </div>
                <div class="piece-id-text">
                    <div>
                        {{ pieceId }}
                    </div>
                    <div class="text">
                        Piece no
                    </div>
                </div>

            </div>
            <div class="color-palette">

                <div v-for="colorPiece in variants" :key="colorPiece.color">
                    <b-tooltip position="is-bottom" type="is-dark" append-to-body multilined>
                        <template v-slot:content>
                            <section class="b-tooltips">
                                <div>
                                    <div> Color name: {{ getColorName(colorPiece.color) }}</div>
                                    <div> Required quantity: {{ colorPiece.count }} </div>
                                </div>
                            </section>

                        </template>
                        <div class="circle" :style="{ 'background': getColorRGB(colorPiece.color) }">
                            {{ colorPiece.count }}
                        </div>
                    </b-tooltip>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
export default {
    mixins: [legoMixin],
    name: "legoCard",
    props: {
        pieceId: String,
        variants: Array
    },
};
</script>


<style lang="scss" scoped >
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto:wght@500&display=swap');
@import '../assets/style/color.scss';

.lego-card {
    max-width: 240px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    overflow: hidden;
    color: $primar-text-color;


    .card-info {
        font-family: 'Roboto', sans-serif;
        width: 100%;
        border: $border-bg solid;
        padding: 1.5rem;

        .piece-id {
            margin-bottom: 1.2rem;
            display: flex;
            justify-content: center;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            font-size: 0.95rem;

            align-items: center;

            .piece-id-text {
                display: flex;
                flex-direction: column;
                line-height: 17px;

                .text {
                    font-size: 0.8rem;
                    color: #535151;
                }
            }

            .piece-img {
                display: flex;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #d2d2e0de;
                margin-right: 14px;
                justify-content: center;
                align-items: center;

                img {
                    width: 22px;
                    height: 22px;
                }
            }
        }

        .color-palette {
            display: flex;
            margin-top: 10px;
            justify-content: center;
            flex-wrap: wrap;
            column-gap: 0.6rem;
            row-gap: 0.6rem;

            .circle {
                width: 35px;
                height: 35px;
                -moz-border-radius: 50px;
                -webkit-border-radius: 50px;
                border-radius: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

}
</style>