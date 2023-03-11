<template>
    <div class="custom-view-container">
        <!--    <custom-set v-for="customPieces in customInventory" :key="customPieces.pieceID" :pieceId="customPieces.pieceID"
            :variants="customPieces.matchedVariants"></custom-set> -->
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
import { legoStore } from '@/common/store';
import customSet from '@/components/customSet.vue';
export default {
    mixins: [legoMixin],
    components: {
        customSet
    },
    mounted() {
        this.createCustomBuilt()

    },
    methods: {
        async createCustomBuilt() {
            await this.until(() => this.fetchDone == true);
            const halfOfTheUsers = Math.ceil(this.otherUsersInventory.length / 2)

            console.log(halfOfTheUsers)
            const usernames = this.otherUsersInventory.map(user => user.username)

            // [ ["arts-n-bricks","captain-pieces","dr_crocodile","green-bricks-only","landscape-artist"], ... ]
            const allUsernameCombinations = this.choose(usernames, halfOfTheUsers)


            const usersWithMatchedColorVariants = this.userInventory.collection.map(piece => {
                const pieceID = piece.pieceId;
                const matchedUsers = this.otherUsersInventory.map(user => {
                    return {
                        info: user.collection.find(
                            otherUserPiece => otherUserPiece.pieceId === pieceID
                        ),
                        user: user.username
                    }
                })
                const matchedVariants = piece.variants.map(
                    colorVariant => {
                        const colorNo = colorVariant.color
                        const matchedUserColorVariant = matchedUsers.map(matchedUser => {
                            return {
                                colorInfo: matchedUser.info.variants.find(variant => variant.color === colorNo),
                                user: matchedUser.user
                            }
                        }).filter(matchedUser => matchedUser.colorInfo)

                        if (!(matchedUserColorVariant.length >= halfOfTheUsers)) return;

                        matchedUserColorVariant.sort((a, b) => b.colorInfo.count - a.colorInfo.count)
                        return { colorNo, matchedUserColorVariant }


                    }
                ).filter(colorVariant => colorVariant)
                return { matchedVariants, pieceID }
            })
            console.log(usersWithMatchedColorVariants)

            console.log(allUsernameCombinations)

            const x = allUsernameCombinations.map(usernamesWihtCombination => {
                let sumOfBricks = 0
                const matchedPiecesWithCombination = usersWithMatchedColorVariants.map(({ matchedVariants, pieceID }) => {

                    const matchedColorsWithCombination = matchedVariants.map(({ colorNo, matchedUserColorVariant }) => {
                        const matchedUsersWithColor = matchedUserColorVariant.map(colorWithMatchedUser =>
                            colorWithMatchedUser.user
                        )

                        const areAllNamesIncluded = usernamesWihtCombination.every(username => matchedUsersWithColor.includes(username))
                        if (!areAllNamesIncluded) return


                        const lastElementInfoOfNamesCombination = matchedUserColorVariant.filter(({ colorInfo, user }) =>
                            usernamesWihtCombination.includes(user)
                        ).pop()

                        const indexOfMatchedNameWithCombination = matchedUserColorVariant.findIndex(({ colorInfo, user }) =>
                            user === lastElementInfoOfNamesCombination.user
                        )
                        const matchUsersWithCombination = matchedUserColorVariant.slice(0, indexOfMatchedNameWithCombination)

                        const minRequirementForColor = matchUsersWithCombination[matchUsersWithCombination.length - 1].colorInfo.count
                        sumOfBricks += minRequirementForColor
                        return { colorNo, minRequirementForColor, matchUsersWithCombination }

                    })
                    if (!matchedColorsWithCombination) return

                    return { pieceID, matchedColorsWithCombination }
                })
                if (!matchedPiecesWithCombination) return

                return { matchedPiecesWithCombination, sumOfBricks }
            })

            console.log(x)

        },
        choose(arr, k, prefix = []) {
            if (k == 0) return [prefix];
            return arr.flatMap((v, i) =>
                this.choose(arr.slice(i + 1), k - 1, [...prefix, v])
            );
        }

    }
}
</script>


<style lang="scss" scoped>
.custom-view-container {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;
    justify-content: center;
}
</style>