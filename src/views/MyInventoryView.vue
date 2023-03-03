<template>
    <div class="inventory">
        <div class="lego-card">
            <img src="../assets/images/logoFrame.png" alt="Lego Frame">
            <div class="card-info">
                <div class="piece-id"> Piece Id : 3710</div>
                <div class="color-palette">
                    <div class="circle">
                        9
                    </div>
                    <div class="circle">
                        9
                    </div>
                    <div class="circle">
                        9
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped >
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto:wght@500&display=swap');

.inventory {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .lego-card {
        max-width: 300px;
        margin-right: 8px;
        margin-bottom: 8px;
        position: relative;
        border-radius: 31px;
        overflow: hidden;

        img {
            max-height: 200px;
        }

        .card-info {
            font-family: 'Roboto', sans-serif;
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;

            .piece-id {
                margin: auto 0;
                display: flex;
                justify-content: center;
                background-image: linear-gradient(to left, violet, indigo, green, blue, rgb(255, 0, 217), orange, red);
                -webkit-background-clip: text;
                -moz-background-clip: text;
                background-clip: text;
                color: transparent;
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
}
</style>