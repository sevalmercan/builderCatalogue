<template>
    <div>
        deneme
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
export default {
    mixins: [legoMixin],
    mounted() {
        this.createCustomBuilt()
    },
    methods: {
        async createCustomBuilt() {
            await this.until(() => this.fetchDone == true);
            const deneme = this.otherUsersInventory
            console.log(this.userInventory)
            console.log(deneme)
            const otherUserInv = deneme[0]


            console.log(otherUserInv)
            // /*             this.userInventory.collection.forEach(piece => {

            //                 const pieceID = piece.pieceId;
            //                 console.log(pieceID)
            //                 const matchedUsers = otherUserInv.filter(user => user.collection.find(
            //                     otherUserPiece => otherUserPiece.pieceId === pieceID
            //                 ))
            //                 console.log(matchedUsers)




            //             }) */

        },

    }
}
</script>