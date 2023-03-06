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
    isSetAvailableForUser(sets) {
      return !sets.some(set => {
        return set.variants.some(variant => variant.difference < 0
          || variant.difference === NON_AVAILABLE)
      });
    },
    async getAllUsersInventory() {
      for (const user of this.allUsers) {
        await axios
          .get(`https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/${user.id}`)
          .then(response => (legoStore.otherUsersInventory.push(response.data)))

      }
    },
    compareInventoryWithOtherUsers(newArr) {
      return newArr.map(singlePiece => {
        singlePiece.variants = singlePiece.variants.map(variant => {
          const isVariantAvailable = variant.difference < 0 || variant.difference === NON_AVAILABLE
          if (!isVariantAvailable) return variant;

          let missingVariant = variant
          this.otherUsersInventory.map(user => {
            const matchedPiece = user.collection.find(otherUserCollectionPiece =>
              otherUserCollectionPiece.pieceId === singlePiece.designID)
            if (!matchedPiece) return

            const otherUserMatchedPiece =
              matchedPiece.variants.find(colorVariant => colorVariant.color === missingVariant.color.toString())
            const isOtherUserHasNone = (missingVariant.difference === NON_AVAILABLE && otherUserMatchedPiece?.count >= missingVariant.count)
            const isOtherUserHasEnough =
              (otherUserMatchedPiece?.count >= Math.abs(missingVariant.difference))
            if (!(isOtherUserHasNone || isOtherUserHasEnough)) return;

            let foundPiece = otherUserMatchedPiece.count
            if (variant['otherUsers']) {
              variant.otherUsers.push({ user: user.username, count: foundPiece })
              return;
            }
            variant = {
              ...missingVariant,
              otherUsers: [{ user: user.username, count: foundPiece }]
            }
          })
          return variant
        }
        )
        return singlePiece
      });
    },
    async addDetailsToAllSets() {
      for (let set of this.sets) {
        let setDetails = []
        await axios
          .get(`https://d16m5wbro86fg2.cloudfront.net/api/set/by-id/${set.id}`)
          .then(response => (setDetails = response.data));

        setDetails = this.getAllColorVariants(setDetails.pieces)
        setDetails = this.compareInventoryWithOtherUsers(setDetails)
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

    await this.getAllUsersInventory()
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