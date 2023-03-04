<template>
    <div class="set-details">
        sets
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';
export default {
    mixins: [legoMixin]
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.set-details {
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    overflow: hidden;
    color: $primar-text-color;
    border: $button-bg solid;
    height: 100%;
}
</style>