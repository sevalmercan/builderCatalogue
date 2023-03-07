<template>
    <div>

        <b-button type="is-warning is-light" @click="isModalActive = !isModalActive">
            Show Other Users</b-button>

        <b-modal v-model="isModalActive">
            <div class="card">
                <div v-for="otherUser in otherUserInfo" :key="otherUser.user">
                    <div>
                        {{ getName(otherUser.user) }}
                        {{ otherUser.count }}
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import legoMixin from '@/common/legoMixin.vue';

export default {
    mixins: [legoMixin],
    props: {
        otherUserInfo: Array
    },
    data() {
        return {
            isModalActive: false
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

::v-deep .modal-background {
    background-color: transparent
}

::v-deep .modal .modal-content {
    width: 250px;
    border: $button-bg solid;
    color: $primar-text-color;
}

::v-deep .modal.is-active {
    position: absolute;
    height: max-content;
    overflow: inherit;
}

::v-deep .modal-close {
    position: absolute;
    background-color: rgba(10, 10, 10, 0.2);
}
</style>