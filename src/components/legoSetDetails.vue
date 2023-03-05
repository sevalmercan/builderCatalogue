<template>
    <div class="set-details">
        <div v-for="set in setInfo" :key="set.designID">
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
                                {{ calculateWithUsersInventory({
                                    designID: set.designID,
                                    color: pieceStatistic.color,
                                    count: pieceStatistic.count
                                }) }}
                            </div>
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
export default {
    mixins: [legoMixin],
    props: {
        singleSetDetails: Array
    },
    data() {
        return {
            setInfo: []
        }
    },
    methods: {
        getColor(currentColorCode) {
            return colours.find(color => color.code === currentColorCode).rgb
        },
        calculateTotalBrick(variants) {
            let totalBrick = 0
            variants.forEach(color => {
                totalBrick += color.count
            });
            return totalBrick
        },
        calculateWithUsersInventory({ designID, color, count }) {
            let matchedColor;
            for (let piece of this.userInventory.collection) {
                if (piece.pieceId === designID) {
                    matchedColor = piece.variants.find(variant => variant.color === color.toString())
                }
            }
            if (matchedColor) {
                return matchedColor.count - count
            }
            return "You have none"


        }
    },
    created() {
        for (let singleSet of this.singleSetDetails) {

            const setId = singleSet.part.designID
            let matchedSet = this.setInfo.find(set => set.designID === setId)
            if (!matchedSet) {
                this.setInfo.push({
                    designID: singleSet.part.designID,
                    variants: [{ color: singleSet.part.material, count: singleSet.quantity }]
                })
            }
            else {
                matchedSet = { ...matchedSet, variants: matchedSet.variants.push({ color: singleSet.part.material, count: singleSet.quantity }) }

            }
        }
        console.log(this.setInfo)
        console.log(this.userInventory.collection)
    }
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