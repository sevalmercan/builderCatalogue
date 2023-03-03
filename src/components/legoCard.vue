<template>
    <div class="lego-card">
        <div class="card-info">
            <div class="piece-id"> Piece Id : 3710</div>
            <div class="color-palette">
                <div class="circle">
                    9
                </div>
            </div>

        </div>
    </div>
</template>



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

            .circle {
                width: 45px;
                height: 45px;
                background: rgba(247, 0, 161, 0.304);
                -moz-border-radius: 50px;
                -webkit-border-radius: 50px;
                border-radius: 50px;
                color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 3px;
            }
        }
    }

}
</style>