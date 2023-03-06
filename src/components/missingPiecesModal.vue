<template>
    <div>
        <button @click="isModalActive = !isModalActive">
            {{ isModalActive }}
        </button>
        <b-modal v-model="isModalActive">
            <div class="card">
                <div v-for="otherUser in otherUserInfo" :key="otherUser.user">
                    <div>
                        {{ otherUser.user }}
                        {{ otherUser.count }}
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>

export default {
    props: {
        otherUserInfo: Array
    },
    data() {
        return {
            isModalActive: false
        }
    }

}

</script>

<style lang="scss" scoped>
::v-deep .modal-background {
    background-color: transparent
}

::v-deep .modal .modal-content {
    width: 250px
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