<script>
const NON_AVAILABLE = "You have none";
const ALL_AVAILABLE = "You have all necessary pieces"

import { legoStore } from "./store";
export default {
    name: "LegoMixin",
    methods: {
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
        }

    },
};
</script>