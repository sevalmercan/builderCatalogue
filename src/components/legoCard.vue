<template>
    <div class="lego-card">
        <div class="card-info">
            <div class="piece-id"> Piece Id : {{ pieceId }}</div>
            <div class="color-palette">
                <div v-for="colorPiece in variants" :key="colorPiece.color">
                    <div class="circle" :style="{ 'background': 'rgba(247, 0, 161, 0.2)' }">
                        {{ colorPiece.count }}
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "legoCard",
    props: {
        pieceId: String,
        variants: Array
    }

};
</script>


<style lang="scss" scoped >
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto:wght@500&display=swap');

.lego-card {
    max-width: 300px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    overflow: hidden;


    .card-info {
        font-family: 'Roboto', sans-serif;
        width: 100%;
        border: solid;
        padding: 30px;

        .piece-id {
            margin: auto 0;
            display: flex;
            justify-content: center;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            color: black;
            font-size: 20px;
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
                color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 3px;
                margin-bottom: 3px;
            }
        }
    }

}
</style>