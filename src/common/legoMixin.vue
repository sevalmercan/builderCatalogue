<script>

import axios from 'axios'
import { colours } from './colours';
import { NON_AVAILABLE, ALL_AVAILABLE } from './constants'
import { legoStore } from "./store";
export default {
    name: "LegoMixin",
    methods: {
        getColorName(currentColorCode) {
            return colours.find(color => color.code.toString() === currentColorCode.toString()).name
        },
        getColorRGB(currentColorCode) {
            return colours.find(color => color.code.toString() === currentColorCode.toString()).rgb
        },
        getAllColorVariants(setDetails) {
            let setInfo = []
            for (const singleSet of setDetails) {
                const setId = singleSet.part.designID
                const matchedSet = setInfo.find(set => set.designID === setId)
                const difference = this.compareWithUsersInventory({
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
        compareWithUsersInventory({ designID, color, count }) {
            const matchDesignId = this.userInventory.collection.find(piece => piece.pieceId === designID)
            const matchedColor = matchDesignId.variants.find(variant =>
                variant.color === color.toString())
            if (!matchedColor) return NON_AVAILABLE;

            const result = matchedColor.count - count
            return result === 0 ? ALL_AVAILABLE : result
        },
        async getAllUsersInventory() {
            const allUsers = []
            for (const user of this.allUsers) {
                if (user.id !== this.userInventory.id) {
                    await axios
                        .get(`https://d16m5wbro86fg2.cloudfront.net/api/user/by-id/${user.id}`)
                        .then(response => (allUsers.push(response.data)))
                }
            }
            legoStore.otherUsersInventory = allUsers
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

            legoStore.allSets = this.sets
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
                            variant.otherUsers.push({ user: user.username, count: foundPiece, location: user.location })
                            return;
                        }
                        variant = {
                            ...missingVariant,
                            otherUsers: [{ user: user.username, count: foundPiece, location: user.location }]
                        }
                    })
                    return variant
                }
                )
                return singlePiece
            });
        },
        isSetAvailableForUser(sets) {
            return !sets.some(set => {
                return set.variants.some(variant => variant.difference < 0
                    || variant.difference === NON_AVAILABLE)
            });
        },
        configureInitialSet() {
            legoStore.setDetails = this.sets[0].setDetails
            this.selectedSetName = this.sets[0].name
        },
        getName(name) {
            // regEx : split the string from '-' and '_' characthers
            // and make uppercase first letter of each word 
            return name.split(/[-_]+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        },
        currentRoute() {
            return this.$route.path.split('/')[2]
        }
    },
    computed: {
        userInventory() {
            return legoStore.userInventory;
        },
        setDetails() {
            return legoStore.setDetails
        },
        sets() {
            return legoStore.sets
        },
        allUsers() {
            return legoStore.allUsers
        }
        , otherUsersInventory() {
            return legoStore.otherUsersInventory
        },
        allSets() {
            return legoStore.allSets
        },
        customInventory() {
            return legoStore.customInventory
        }
    },
};
</script>