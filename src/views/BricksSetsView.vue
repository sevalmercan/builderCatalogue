<template>
  <div class="bricks-set">
    <b-switch v-model="isAvailableShown">{{ switchText }}</b-switch>
    <div class="content">
      <div class="bricks-card-container">
        <div class="card-wrapper">
          <bricks-set-card v-for="singleSet in sets" :key="singleSet.id" @click.native="changeSelectedSet(singleSet.id)"
            :name="singleSet.name" :setNumber="singleSet.setNumber" :totalPieces="singleSet.totalPieces"
            :isSelected="selectedSetName === singleSet.name" />
        </div>
      </div>
      <div class="bricks-set-details-container">
        <div class="set-title">
          Pieces for "{{ getName(selectedSetName) }}"
        </div>
        <div class="set-details-wrapper">
          <bricks-set-details :singleSetDetails="setDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import bricksSetCard from '@/components/bricksSetCard.vue';
import bricksSetDetails from '@/components/bricksSetDetails.vue';
import { bricksStore } from "../common/store"
import bricksMixin from '@/common/bricksMixin.vue';
export default {
  mixins: [bricksMixin],
  components: {
    bricksSetCard,
    bricksSetDetails
  },
  data() {
    return {
      isAvailableShown: false,
      selectedSetName: "",

    }
  },
  created() {
    this.selectedSetName = this.sets[0].name;
  },
  watch: {
    isAvailableShown(switchStatus) {
      bricksStore.sets = switchStatus ? this.getAvaliableSets(this.sets) : this.allSets;
      this.configureInitialSet()
    }
  },
  methods: {
    changeSelectedSet(setId) {
      const matchedSet = this.sets.find(set => set.id === setId)
      bricksStore.setDetails = matchedSet.setDetails
      this.selectedSetName = matchedSet.name
    },

    getAvaliableSets() {
      return this.sets.filter(set => set.isAvailable)
    },
  },
  computed: {
    switchText() {
      return !this.isAvailableShown ? 'Show available sets' : 'Show all'

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';


.bricks-set {
  display: flex;
  flex-direction: column;
  height: 88vh;
  margin: 0 auto;
  max-width: 1100px;

  ::v-deep .switch {
    margin-bottom: 15px;
  }

  .content {
    display: flex;
    height: 88%;
    justify-content: space-between;

    .bricks-card-container {
      padding: 0.5rem 1rem;
      width: 60%;

      .card-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 100%;
        overflow-y: auto;
        max-width: 600px;
        row-gap: 1rem;

      }
    }

    .bricks-set-details-container {
      width: 40%;
      height: 100%;
      max-width: 440px;

      .set-title {
        display: flex;
        justify-content: center;
        color: $primar-text-color;
        margin-bottom: 0.7rem;
        font-size: 1.1rem;
      }

      .set-details-wrapper {
        height: 92%;
      }

    }
  }


}
</style>