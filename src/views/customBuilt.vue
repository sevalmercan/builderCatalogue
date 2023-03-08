<template>
    <div>
        deneme
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
export default {
    mixins: [legoMixin],
    created() {
        console.log(this.userInventory)
        console.log(this.otherUsersInventory)
    }
}
</script>