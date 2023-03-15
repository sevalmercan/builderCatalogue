<template>
    <div>
        <b-icon pack="fas" icon="fa-duotone fa-eye" size="is-small" @click.native="isModalActive = !isModalActive">
        </b-icon>
        <b-modal v-model="isModalActive">
            <div class="card">
                <p class="piece-no">Piece no: {{ pieceNo }} </p>
                <div class="color-info">
                    <div> Color name: {{ getColorName(color) }}</div>
                    <div> Required quantity: {{ requiredQuantity }} </div>
                </div>
                <div class="other-users-wrapper">
                    <b-table :data="data" :columns="columns"></b-table>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import bricksMixin from '@/common/bricksMixin.vue';

export default {
    mixins: [bricksMixin],
    props: {
        otherUserInfo: Array,
        color: Number,
        requiredQuantity: Number,
        pieceNo: String

    },
    data() {
        return {
            isModalActive: false,
            data: [],
            columns: [
                {
                    field: 'username',
                    label: 'Username',
                },
                {
                    field: 'quantity',
                    label: 'Quantity',
                    centered: true
                },
                {
                    field: 'location',
                    label: 'Location',
                }
            ]
        }
    },
    created() {
        this.createUserInfoTable()
    },
    methods: {
        createUserInfoTable() {
            this.data = this.otherUserInfo.map(otherUser => {
                return {
                    'username': this.getName(otherUser.user),
                    'quantity': otherUser.count,
                    'location': otherUser.location
                }
            }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

.color-info {
    display: flex;
    justify-content: center;
    column-gap: 1rem;
    margin-bottom: 0.6rem;
}

.other-users-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
}

::v-deep .table {
    background-color: $main-page-bg;
}

::v-deep .card {
    padding: 2rem;
    background: inherit;
}

.piece-no {
    display: flex;
    justify-content: center;
}

::v-deep .fas {
    cursor: pointer;
}

::v-deep .modal .modal-content {
    width: 50%;
    border: $border-bg solid;
    color: $primar-text-color;
    background-color: $main-page-bg;
}

::v-deep .modal.is-active {
    outline: none;
}
</style>