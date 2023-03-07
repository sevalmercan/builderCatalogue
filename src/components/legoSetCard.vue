<template>
    <div class="set-card-wrapper">
        <div class="lego-set-card">

            <img :src="getSetImage(name)" alt="Lego Set">

            <div class="info">
                <div>
                    Name : {{ name }}
                </div>
                <div>
                    Set Number : {{ setNumber }}
                </div>
                <div>
                    Total Pieces: {{ totalPieces }}
                </div>
            </div>

        </div>


    </div>
</template>
  
<script>

export default {
    props: {
        name: String,
        setNumber: String,
        totalPieces: Number
    },
    methods: {
        getSetImage(setName) {
            return require(`../assets/images/setImages/${setName}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';




.set-card-wrapper {
    color: $primar-text-color;
    width: 100%;
    font-weight: bold;

    .lego-set-card {

        margin-right: 8px;
        margin-bottom: 8px;
        border-radius: 6px;
        overflow: hidden;
        color: $primar-text-color;
        border: $button-bg solid;
        height: 165px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        min-width: 430px;

        img {
            width: auto;
            height: auto;
            margin: 5px;
            border-radius: 15px;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

    }

    .lego-set-card>div {
        display: flex;
        justify-content: center;
    }
}
</style>