<template>
    <div>
        <b-icon pack="fas" icon="fa-duotone fa-eye" size="is-small" @click.native="isModalActive = !isModalActive">
        </b-icon>
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


::v-deep .fas {
    cursor: pointer;
}

::v-deep .modal .modal-content {
    width: 250px;
    border: $button-bg solid;
    color: $primar-text-color;
}

::v-deep .modal.is-active {
    outline: none;
}
</style>