<template>
    <div class="set-details">
        <div v-for="set in singleSetDetails" :key="set.designID">
            <div class="single-set">
                <div class="total-info">
                    <div>
                        Piece Id : {{ set.designID }}
                    </div>

                    <div>
                        Total Brick : {{ calculateTotalBrick(set.variants) }}
                    </div>
                </div>
                <div v-for="pieceStatistic in set.variants" :key="pieceStatistic.color">
                    <div class="piece-statistics">
                        <div class="piece-result">
                            <div class="circle" :style="{ 'background': getColor(pieceStatistic.color) }">
                                {{ pieceStatistic.count }}
                            </div>
                            <div>
                                {{ pieceStatistic.difference }}
                            </div>
                            <missing-pieces-modal v-if="pieceStatistic.otherUsers"
                                :otherUserInfo="pieceStatistic.otherUsers" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
import { colours } from '@/common/colours';
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
        getColor(currentColorCode) {
            return colours.find(color => color.code === currentColorCode).rgb
        },
        calculateTotalBrick(variants) {
            return variants.reduce((acc, color) => {
                acc += color.count
                return acc
            }, 0);
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.set-details {
    margin: 3px 17px;
    overflow: hidden;
    color: $primar-text-color;
    display: flex;
    flex-direction: column;
    border-bottom: $button-bg solid;

    .single-set {
        border-bottom: $button-bg solid;

        .total-info {
            display: flex;
            justify-content: space-around;
            margin: 18px 45px;
        }

        .piece-statistics {
            display: flex;
            flex-direction: column;
            position: relative;

            .piece-result {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 0 67px;
                margin-bottom: 15px;

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
</style>