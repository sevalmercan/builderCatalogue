<template>
  <div class="lego-set">
    <b-switch v-model="isSwitched">Default</b-switch>
    <div class="content">
      <div class="lego-card-container">
        <div v-for="singleSet in sets" :key="singleSet.id">
          <div @click="changeSetId(singleSet.id)">
            <lego-set-card :name="singleSet.name" :setNumber="singleSet.setNumber" :totalPieces="singleSet.totalPieces" />
          </div>

        </div>
      </div>
      <div class="lego-set-details-container">
        <div class="set-title">
          {{ setDetails.name }}
        </div>
        <div class="set-details-wrapper">
          <lego-set-details v-if="isFetchDone" :singleSetDetails="setDetails.pieces" />
        </div>
      </div>
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
      isFetchDone: false,
      isSwitched: false
    }
  },
  methods: {
    async changeSetId(setId) {
      this.isFetchDone = false
      await axios
        .get(`https://d16m5wbro86fg2.cloudfront.net/api/set/by-id/${setId}`)
        .then(response => (legoStore.setDetails = response.data));
      this.isFetchDone = true

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
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  ::v-deep .switch {

    margin-bottom: 15px;
  }

  .content {
    display: flex;
    height: 100%;

    .lego-card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 50%;
      height: 100%;
      overflow: scroll;


    }

    .lego-set-details-container {
      width: 47%;
      height: 100%;

      .set-title {
        display: flex;
        justify-content: center;
        color: $primar-text-color;
        font-size: 29px;
        margin-bottom: 16px;
        line-height: 33px;
      }

      .set-details-wrapper {
        height: 100%;
        border: $button-bg solid;
        overflow: scroll;
      }

    }
  }


}
</style>