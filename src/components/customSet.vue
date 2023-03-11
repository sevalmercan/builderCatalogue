<template>
    <div class="custom-set-wrapper">
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
        <div>
            <div class="color-palette">
                <div v-for="variant in variants" :key="variant.colorNo">
                    <b-tooltip position="is-bottom" type="is-dark" append-to-body multilined>
                        <template v-slot:content>
                            <section class="b-tooltips">
                                <div>
                                    <div> Color name: {{ getColorName(variant.colorNo) }}</div>
                                    <div> Required quantity: {{ variant.minRequirementForColor
                                    }} </div>
                                </div>
                            </section>

                        </template>
                        <div class="circle" :style="{ 'background': getColorRGB(variant.colorNo) }">
                            {{ variant.minRequirementForColor
                            }}
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
    props: {
        pieceId: String,
        variants: Array
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.custom-set-wrapper {
    padding: 1rem 0;
    border: $border-bg solid;
    width: 320px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

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
        padding: 0 1rem;

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
</style>