<template>
    <div class="lego-card">
        <div class="card-info">
            <div class="piece-id"> Piece Id : {{ pieceId }}</div>
            <div class="color-palette">
                <div v-for="colorPiece in variants" :key="colorPiece.color">
                    <div class="circle" :style="{ 'background': getColor(colorPiece.color) }">
                        {{ colorPiece.count }}
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { colours } from '../common/colours'

export default {
    name: "legoCard",
    props: {
        pieceId: String,
        variants: Array
    },
    methods: {
        getColor(currentColorCode) {
            return colours.find(color => color.code.toString() === currentColorCode).rgb
        }
    }

};
</script>


<style lang="scss" scoped >
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto:wght@500&display=swap');
@import '../assets/style/color.scss';

.lego-card {
    max-width: 300px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    overflow: hidden;
    color: $primar-text-color;


    .card-info {
        font-family: 'Roboto', sans-serif;
        width: 100%;
        border: solid;
        padding: 15px;
        border: $button-bg solid;

        .piece-id {
            margin: auto 0;
            display: flex;
            justify-content: center;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            font-size: 20px;
            border-bottom: $button-bg solid;
        }

        .color-palette {
            display: flex;
            margin-top: 10px;
            justify-content: center;
            flex-wrap: wrap;

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
            }
        }
    }

}
</style>