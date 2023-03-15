<template>
    <div class="custom-view-container">
        <div>
            <div class="set-info">
                <div class="info-wrapper">
                    <b-icon class="nav-icon" pack="fas" icon="fal fa-puzzle-piece" size="is-small"> </b-icon>
                    <p> Total bricks for custom set: {{ highestBrickSet.sumOfBricks }}</p>
                </div>

                <div class="info-wrapper">
                    <b-icon class="nav-icon" pack="fas" icon="fas fa-percentage" size="is-small"> </b-icon>
                    <p> Targeted users percentage: %{{ percentageOfUsers }}</p>
                </div>
            </div>

            <div class="usernames">
                <div v-for="username in highestBrickSet.usernamesWihtCombination" :key="username" class="username-wrapper">
                    <b-icon class="nav-icon" pack="fas" icon="fas fa-user" size="is-small"> </b-icon>
                    <p> {{ getName(username) }} </p>

                </div>
            </div>

        </div>
        <div class="set-pieces-wrapper">
            <custom-set v-for="customPieces in highestBrickSet.matchedPiecesWithCombination" :key="customPieces.pieceID"
                :pieceId="customPieces.pieceID" :variants="customPieces.matchedColorsWithCombination">
            </custom-set>
        </div>


    </div>
</template>

<script>
import bricksMixin from '@/common/bricksMixin.vue';
import { bricksStore } from '@/common/store';
import customSet from '@/components/customSet.vue';
export default {
    mixins: [bricksMixin],
    components: {
        customSet
    },
    data() {
        return {
            highestBrickSet: [],
            percentageOfUsers: ''
        }
    },
    async mounted() {
        this.createCustomBuild()
        this.highestBrickSet = this.customInventory[0]
    },
    methods: {
        createCustomBuild() {
            this.percentageOfUsers = Math.ceil(this.otherUsersInventory.length / 2) * 100 / this.otherUsersInventory.length
            const halfOfTheUsers = Math.ceil(this.otherUsersInventory.length / 2)

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

            bricksStore.customInventory = allUsernameCombinations.map(usernamesWihtCombination => {
                let sumOfBricks = 0
                const matchedPiecesWithCombination = usersWithMatchedColorVariants.map(({ matchedVariants, pieceID }) => {

                    const matchedColorsWithCombination = matchedVariants.map(({ colorNo, matchedUserColorVariant }) => {
                        const matchedUsersWithColor = matchedUserColorVariant.map(colorWithMatchedUser =>
                            colorWithMatchedUser.user
                        )

                        const areAllNamesIncluded = usernamesWihtCombination.every(username => matchedUsersWithColor.includes(username))
                        if (!areAllNamesIncluded) return
                        const lastElementInfoOfNamesCombination = matchedUserColorVariant.filter(({ user }) =>
                            usernamesWihtCombination.includes(user)
                        ).pop()

                        const indexOfMatchedNameWithCombination = matchedUserColorVariant.findIndex(({ user }) =>
                            user === lastElementInfoOfNamesCombination.user
                        )
                        const matchUsersWithCombination = matchedUserColorVariant.slice(0, indexOfMatchedNameWithCombination)

                        const minRequirementForColor = matchUsersWithCombination[matchUsersWithCombination.length - 1].colorInfo.count
                        sumOfBricks += minRequirementForColor
                        return { colorNo, minRequirementForColor, matchUsersWithCombination }

                    }).filter(matchedColorVariants => matchedColorVariants)
                    if (!matchedColorsWithCombination) return

                    return { pieceID, matchedColorsWithCombination }
                })
                if (!matchedPiecesWithCombination) return

                return { matchedPiecesWithCombination, sumOfBricks, usernamesWihtCombination }
            }).sort((a, b) => b.sumOfBricks - a.sumOfBricks)
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
@import '../assets/style/color.scss';

::v-deep .icon.is-small {
    font-size: 0.8rem;
}

.custom-view-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .set-info {
        display: flex;
        column-gap: 1rem;
        justify-content: center;

        .info-wrapper {
            display: flex;
            align-items: center;
            column-gap: 0.3rem;
            margin-bottom: 1rem;
            line-height: 1;
        }
    }

    .usernames {
        display: flex;
        justify-content: center;
        column-gap: 1rem;
        margin-bottom: 1rem;

        .username-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 0.3rem;
            border: $border-bg solid;
            border-radius: 11px;
            padding: 0.3rem 0.5rem;
            font-size: 0.9rem;
        }
    }


    .set-pieces-wrapper {
        display: flex;
        flex-wrap: wrap;
        column-gap: 1.1rem;
        row-gap: 1.1rem;
        justify-content: center;

    }
}
</style>