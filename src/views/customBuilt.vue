<template>
    <div>
        deneme
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
import { legoStore } from '@/common/store';
export default {
    mixins: [legoMixin],
    mounted() {
        this.createCustomBuilt()
        console.log(this.customInventory)
    },
    methods: {
        async createCustomBuilt() {
            await this.until(() => this.fetchDone == true);
            const halfOfTheUsers = this.otherUsersInventory.length / 2

            legoStore.customInventory = this.userInventory.collection.map(piece => {
                const pieceID = piece.pieceId;
                const matchedUsers = this.otherUsersInventory.map(user => {
                    return {
                        info: user.collection.find(
                            otherUserPiece => otherUserPiece.pieceId === pieceID
                        ),
                        user: user.username
                    }
                })

                if (!(matchedUsers.length >= halfOfTheUsers)) return
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
                        const minRequirement = Math.min(...matchedUserColorVariant.map(item => item.colorInfo.count));

                        return { colorNo, matchedUserColorVariant, minRequirement }


                    }
                ).filter(colorVariant => colorVariant)

                return { matchedVariants, pieceID }
            })
        },
    }
}
</script>