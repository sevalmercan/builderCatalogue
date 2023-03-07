<template>
  <div class="lego-set">
    <b-switch v-model="isAvailableShown">Default</b-switch>
    <div class="content">
      <div class="lego-card-container">
        <lego-set-card v-for="singleSet in sets" :key="singleSet.id" @click.native="changeSelectedSet(singleSet.id)"
          :name="singleSet.name" :setNumber="singleSet.setNumber" :totalPieces="singleSet.totalPieces" />
      </div>
      <div class="lego-set-details-container">
        <div class="set-title">
          {{ selectedSetName }}
        </div>
        <div class="set-details-wrapper">
          <lego-set-details :singleSetDetails="setDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import legoSetCard from '@/components/legoSetCard.vue';
import legoSetDetails from '@/components/legoSetDetails.vue';
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
      isAvailableShown: false,
      selectedSetName: ""
    }
  },
  created() {
    this.selectedSetName = this.sets[0].name;
  },
  watch: {
    isAvailableShown(switchStatus) {
      legoStore.sets = switchStatus ? this.getAvaliableSets(this.sets) : this.allSets;
      this.configureInitialSet()
    }
  },
  methods: {
    changeSelectedSet(setId) {
      const matchedSet = this.sets.find(set => set.id === setId)
      legoStore.setDetails = matchedSet.setDetails
      this.selectedSetName = matchedSet.name
    },

    getAvaliableSets() {
      return this.sets.filter(set => set.isAvailable)
    },

  },
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.lego-set {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 0 2rem;
  max-width: 1100px;

  ::v-deep .switch {
    margin-bottom: 15px;
  }

  .content {
    display: flex;
    height: 100%;
    justify-content: space-between;

    .lego-card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 60%;
      height: 100%;
      overflow: scroll;
      max-width: 600px;
    }

    .lego-set-details-container {
      width: 40%;
      height: 100%;
      max-width: 440px;

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