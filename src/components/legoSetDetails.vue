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
            <!--  <div class="statistic-header">
                <div class="s-title">
                    Set Inventory
                </div>

                <div class="s-title">
                    Comparing User Inventory
                </div>
            </div> -->
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
    margin: 3px 17px;
    overflow: hidden;
    color: $primar-text-color;
    color: $primar-text-color;
    display: flex;
    flex-direction: column;
    border-bottom: $button-bg solid;

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
            font-size: 13px;

            .s-title {
                display: flex;
                justify-content: center;

                text-align: center;

            }
        }

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
</style>