<template>
    <div class="set-details">
        <div class="total-info">
            <div>
                Piece Id : 3370
            </div>

            <div>
                Total Brick : 17
            </div>
        </div>

        <div class="piece-statistics">
            <div class="statistic-header">
                <div class="s-title">
                    Set Inventory
                </div>

                <div class="s-title">
                    Comparing User Inventory
                </div>
            </div>
            <div class="piece-result">
                <div class="circle">
                    9
                </div>
                <div>
                    +5
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
export default {
    mixins: [legoMixin]
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.set-details {
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    overflow: hidden;
    color: $primar-text-color;
    border: $button-bg solid;
    color: $primar-text-color;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-weight: bold;

    .total-info {
        display: flex;
        justify-content: space-around;
        margin: 18px 45px;
    }

    .piece-statistics {
        display: flex;
        flex-direction: column;

        .statistic-header {
            display: flex;
            justify-content: space-around;
            margin: 5px 55px;

            .s-title {
                display: flex;
                justify-content: center;
                width: 132px;
                text-align: center;
                border: $button-bg solid;
                border-radius: 6px;
            }
        }

        .piece-result {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 0 16%;

            .circle {
                width: 45px;
                height: 45px;
                -moz-border-radius: 50px;
                -webkit-border-radius: 50px;
                border-radius: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
                margin-bottom: 5px;
                background: red;

            }
        }

    }


}
</style>