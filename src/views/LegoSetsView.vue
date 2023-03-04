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
import axios from 'axios'
import { legoStore } from "../common/store"
export default {
  components: {
    legoSetCard,
    legoSetDetails
  },
  mounted() {
    axios
      .get('https://d16m5wbro86fg2.cloudfront.net/api/set/by-id/040f11ab-e301-4724-bacd-50841816e06b')
      .then(response => (legoStore.setDetails = response.data))
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
    border: $button-bg solid;

  }
}
</style>