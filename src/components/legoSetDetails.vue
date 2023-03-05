<template>
    <div class="set-details">
        <div v-for="set in setInfo" :key="set.designID">
            <div class="single-set">
                <div class="total-info">
                    <div>
                        Piece Id : {{ set.designID }}
                    </div>

                    <div>
                        Total Brick : 17
                    </div>
                </div>

                <div class="piece-statistics">

                    <div class="piece-result">
                        <div class="circle">
                            9
                        </div>
                        <div>
                            +5 available
                        </div>
                    </div>


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
        singleSetDetails: Array
    },
    data() {
        return {
            setInfo: []
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
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.set-details {
    margin: 3px 17px;
    overflow: hidden;
    color: $primar-text-color;
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
                    background: red;

                }
            }

        }
    }



}
</style>