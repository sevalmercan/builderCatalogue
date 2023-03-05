<template>
  <div class="lego-set">
    <b-switch v-model="isAvailableShown">Default</b-switch>
    <div class="content">
      <div class="lego-card-container">
        <div v-for="singleSet in sets" :key="singleSet.id">
          <div @click="changeSelectedSet(singleSet.id)">
            <lego-set-card :name="singleSet.name" :setNumber="singleSet.setNumber" :totalPieces="singleSet.totalPieces" />
          </div>
        </div>
      </div>
      <div class="lego-set-details-container">
        <div class="set-title">
          {{ selectedSetName }}
        </div>
        <div class="set-details-wrapper">
          <lego-set-details v-if="allSets.length > 0" :singleSetDetails="setDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const NON_AVAILABLE = "You have none";
const ALL_AVAILABLE = "You have all necessary pieces"

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
      isAvailableShown: false,
      selectedSetName: "",
      allSets: [],
    }
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
    calculateWithUsersInventory({ designID, color, count }) {
      const matchDesignId = this.userInventory.collection.find(piece => piece.pieceId === designID)
      const matchedColor = matchDesignId.variants.find(variant =>
        variant.color === color.toString())
      if (!matchedColor) return NON_AVAILABLE;

      const result = matchedColor.count - count
      return result === 0 ? ALL_AVAILABLE : result
    },
    getAllColorVariants(setDetails) {
      let setInfo = []
      for (const singleSet of setDetails) {
        const setId = singleSet.part.designID
        const matchedSet = setInfo.find(set => set.designID === setId)
        const difference = this.calculateWithUsersInventory({
          designID: singleSet.part.designID,
          color: singleSet.part.material,
          count: singleSet.quantity,
        });
        const variantInfo = {
          difference,
          color: singleSet.part.material,
          count: singleSet.quantity,
        }
        if (!matchedSet) {
          setInfo.push({
            designID: singleSet.part.designID,
            variants: [variantInfo]
          })
          continue;
        }
        matchedSet.variants.push(variantInfo)
      }
      return setInfo
    },
    isSetAvailableForUser(sets) {
      return !sets.some(set => {
        return set.variants.some(variant => variant.difference < 0
          || variant.difference === NON_AVAILABLE)
      });
    },
    async addDetailsToAllSets() {
      for (let set of this.sets) {
        let setDetails = []
        await axios
          .get(`https://d16m5wbro86fg2.cloudfront.net/api/set/by-id/${set.id}`)
          .then(response => (setDetails = response.data));

        setDetails = this.getAllColorVariants(setDetails.pieces)
        set['setDetails'] = setDetails
        set['isAvailable'] = this.isSetAvailableForUser(setDetails)
      }

      this.allSets = this.sets
    },
    getAvaliableSets() {
      return this.sets.filter(set => set.isAvailable)
    },
    configureInitialSet() {
      legoStore.setDetails = this.sets[0].setDetails
      this.selectedSetName = this.sets[0].name
    }
  },
  async mounted() {
    await axios
      .get('https://d16m5wbro86fg2.cloudfront.net/api/sets')
      .then(response => (legoStore.sets = response.data.Sets));
    await this.addDetailsToAllSets()
    this.configureInitialSet()
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