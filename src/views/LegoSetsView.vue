<template>
  <div class="lego-set">
    <div class="lego-card-container">
      <div v-for="singleSet in sets" :key="singleSet.id">
        <lego-set-card :name="singleSet.name" :setNumber="singleSet.setNumber" :totalPieces="singleSet.totalPieces" />
      </div>
    </div>
    <div class="lego-set-details-container">
      <lego-set-details v-if="isFetchDone" :singleSetDetails="this.setDetails.pieces" />
    </div>

  </div>
</template>

<script>

import legoSetCard from '@/components/legoSetCard.vue';
import legoSetDetails from '@/components/legoSetDetails.vue';
import axios from 'axios'
import { legoStore } from "../common/store"
import legoMixin from '@/common/legoMixin.vue';
export default {
  mixins: [legoMixin],
  components: {
    legoSetCard,
    legoSetDetails
  },
  data() {
    return {
      singleSetId: "",
      isFetchDone: false
    }
  },
  async mounted() {
    await axios
      .get('https://d16m5wbro86fg2.cloudfront.net/api/sets')
      .then(response => (legoStore.sets = response.data.Sets));

    this.singleSetId = this.sets[0].id


    await axios
      .get(`https://d16m5wbro86fg2.cloudfront.net/api/set/by-id/${this.singleSetId}`)
      .then(response => (legoStore.setDetails = response.data));

    this.isFetchDone = true
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
    height: max-content;
  }

  .lego-set-details-container {
    width: 47%;
    border: $button-bg solid;

  }
}
</style>