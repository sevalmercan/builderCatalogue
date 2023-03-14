<template>
    <div class="set-details">
        <div v-for="set in singleSetDetails" :key="set.designID">
            <div class="single-set">
                <div class="total-info">
                    <div>
                        Piece no: {{ set.designID }}
                    </div>

                    <div>
                        Total bricks: {{ calculateTotalBrick(set.variants) }}
                    </div>
                </div>
                <div class="single-brick">
                    <div class="piece-statistics" v-for="pieceStatistic in set.variants" :key="pieceStatistic.color">
                        <div class="piece-result">
                            <div class="statistic-wrapper">
                                <b-tooltip position="is-bottom" type="is-dark" multilined>
                                    <template v-slot:content>
                                        <section class="b-tooltips">
                                            <div>
                                                <div> Color name: {{ getColorName(pieceStatistic.color) }}</div>
                                                <div> Required quantity: {{ pieceStatistic.count }} </div>
                                            </div>
                                        </section>
                                    </template>
                                    <span class="circle" :style="{ 'background': getColorRGB(pieceStatistic.color) }">
                                        {{ pieceStatistic.count }}
                                    </span>
                                </b-tooltip>
                                <div v-html="getDifferrenceText(pieceStatistic.difference)"></div>

                            </div>
                            <b-tooltip position="is-bottom" type="is-dark" multilined>
                                <template v-slot:content>
                                    <section class="b-tooltips">
                                        <div>
                                            Show users with the piece
                                        </div>
                                    </section>
                                </template>
                                <missing-pieces-modal v-if="pieceStatistic.otherUsers" :color="pieceStatistic.color"
                                    :requiredQuantity="pieceStatistic.count" :otherUserInfo="pieceStatistic.otherUsers"
                                    :pieceNo="set.designID" />
                            </b-tooltip>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { ALL_AVAILABLE } from '@/common/constants';
import legoMixin from '@/common/legoMixin.vue';
import missingPiecesModal from './missingPiecesModal.vue';
export default {
    mixins: [legoMixin],
    components: {
        missingPiecesModal
    },
    data() {
        return {
            isCardModalActive: false
        }
    },
    props: {
        singleSetDetails: Array,
    },
    methods: {
        calculateTotalBrick(variants) {
            return variants.reduce((acc, color) => {
                acc += color.count
                return acc
            }, 0);
        },
        getDifferrenceText(difference) {
            if (difference < 0) return `<span class="is-missing-piece">${difference} missing pieces </span>`
            if (difference > 0) return `<span class="is-extra-piece">${difference} extra pieces </span>`
            if (difference === ALL_AVAILABLE) return `<span class="is-extra-piece">${difference}</span>`
            return `<span class="is-missing-piece">${difference}</span>`
        }
    },

}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

::v-deep .tooltip-content {
    width: auto !important;
}

::v-deep .is-missing-piece {
    color: #a21919cc
}

::v-deep .is-extra-piece {
    color: #2d902dd4
}

.set-details {
    margin: 3px 17px;
    overflow: hidden;
    color: $primar-text-color;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    border: #eae9ee solid;

    .single-set {
        border-bottom: $border-bg solid;

        .total-info {
            display: flex;
            justify-content: space-around;
            margin: 1.5rem;
        }

        .single-brick {
            display: flex;
            flex-direction: column;
            row-gap: 1.1rem;
            padding: 0 1.2rem;
            margin-bottom: 1.5rem;

            .piece-statistics {
                display: flex;
                flex-direction: column;
                position: relative;

                .piece-result {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .statistic-wrapper {
                        display: flex;
                        align-items: center;
                    }

                    .circle {
                        width: 45px;
                        height: 45px;
                        -moz-border-radius: 50px;
                        -webkit-border-radius: 50px;
                        border-radius: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 15px;

                    }
                }

            }
        }

    }



}
</style>