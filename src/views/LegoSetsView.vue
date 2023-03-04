<template>
  <div class="lego-set">
    <div class="lego-card-container">

      <lego-set-card />
      <lego-set-card />
      <lego-set-card />
      <lego-set-card />
    </div>

  </div>
</template>

<script>

import legoSetCard from '@/components/legoSetCard.vue';
export default {

  components: {
    legoSetCard
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.lego-set {


  .lego-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
  }
}
</style>