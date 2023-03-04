<template>
  <div class="lego-set-container">
    <div class="set-card-wrapper">
      <div class="lego-set-card">

        <img src="../assets/images/legoset.jpg" alt="Lego Set">

        <div class="info">
          <div>
            Name : alien-spaceship
          </div>
          <div>
            Set Number : 497XX
          </div>
          <div>
            Total Pieces: 1050
          </div>
        </div>

      </div>


    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.lego-set-container {
  color: $primar-text-color;

  .set-card-wrapper {

    .lego-set-card {
      max-width: 300px;
      margin-right: 8px;
      margin-bottom: 8px;
      border-radius: 6px;
      overflow: hidden;
      color: $primar-text-color;
      border: $button-bg solid;
      height: 105px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      img {
        width: auto;
        height: auto;
        margin: 5px;
        border-radius: 15px;
      }

      .info {
        display: flex;
        flex-direction: column;
      }

    }

    .lego-set-card>div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>