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
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
const NON_AVAILABLE = "You have none";
import legoMixin from '@/common/legoMixin.vue';
import { legoStore } from '@/common/store';
import { colours } from '@/common/colours';
import axios from 'axios'

export default {
    mixins: [legoMixin],
    props: {
        singleSetDetails: Array,
    },
    async created() {
        await this.getAllUsersInventory()
        this.compareInventoryWithOtherUsers()
        console.log(this.singleSetDetails)
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
        async getAllUsersInventory() {
            for (const user of this.allUsers) {
                await axios
                    .get(`https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/${user.id}`)
                    .then(response => (legoStore.otherUsersInventory.push(response.data)))

            }
        },
        compareInventoryWithOtherUsers() {
            let deneme = this.singleSetDetails.map(singlePiece => {
                const designId = singlePiece.designID
                console.log("deneme")
                singlePiece.variants = singlePiece.variants.map(variant => {
                    if (variant.difference < 0
                        || variant.difference === NON_AVAILABLE) {
                        let missingVariant = variant
                        this.otherUsersInventory.map(user => {
                            const matchedPiece = user.collection.find(otherUserCollectionPiece =>
                                otherUserCollectionPiece.pieceId === designId)
                            if (matchedPiece) {
                                let foundPiece;
                                const otherUserMatchedPiece =
                                    matchedPiece.variants.find(variant => variant.color === missingVariant.color.toString())
                                const isOtherUserHasNone = (missingVariant.difference === NON_AVAILABLE && otherUserMatchedPiece?.count >= missingVariant.count)
                                const isOtherUserHasEnough =
                                    (otherUserMatchedPiece?.count >= Math.abs(missingVariant.difference))
                                if (isOtherUserHasNone || isOtherUserHasEnough) {
                                    foundPiece = otherUserMatchedPiece.count
                                    variant = {
                                        ...missingVariant,
                                        otherUsers:
                                            { user: user.username, count: foundPiece }
                                    }
                                }
                            }

                        })
                    }
                    return variant
                }
                )
                return singlePiece
            });
            console.log(deneme)

        }
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