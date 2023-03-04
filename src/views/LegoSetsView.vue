<template>
  <div class="lego-set">
    <div class="lego-card-container">
      <lego-set-card />
      <lego-set-card />
      <lego-set-card />
      <lego-set-card />
    </div>
    <div class="lego-set-details-container">

      <lego-set-details />
    </div>

  </div>
</template>

<script>

import legoSetCard from '@/components/legoSetCard.vue';
import legoSetDetails from '@/components/legoSetDetails.vue';
export default {

  components: {
    legoSetCard,
    legoSetDetails
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.lego-set {
  display: flex;
  justify-content: space-between;
  height: max-content;

  .lego-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
  }

  .lego-set-details-container {
    width: 47%;

  }
}
</style>