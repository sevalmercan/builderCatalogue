<template>
    <div class="login">
        <div class="layout">
            <div class="usernames">
                <div v-for="username in usernames" :key="username" class="username-wrapper"
                    @click="redirectToHome(username)">
                    <b-icon class="nav-icon" pack="fas" icon="fas fa-user" size="is-small"> </b-icon>
                    <p> {{ getName(username) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import legoMixin from '@/common/legoMixin.vue'
export default {
    mixins: [legoMixin],
    data() {
        return {
            users: [],
            usernames: []
        }
    },
    async mounted() {
        await axios
            .get("https://d16m5wbro86fg2.cloudfront.net/api/users")
            .then(response => (this.users = response.data.Users))
        this.usernames = this.users.map(user => user.username)
    },
    methods: {
        redirectToHome(username) {
            const userId = this.users.find(user => user.username === username).id
            localStorage.setItem('userId', userId)
            this.$router.push({ name: `my-inventory` })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

::v-deep .icon.is-small {
    font-size: 1.8rem;
}

.login {
    overflow: hidden;

    .layout {
        margin: 30px 50px;
        overflow: hidden;
        background: $main-page-bg;
        border-radius: 50px;

        .usernames {
            display: flex;
            justify-content: center;
            column-gap: 1rem;
            padding: 1rem;
            margin-bottom: 1rem;
            row-gap: 2rem;
            flex-wrap: wrap;

            .username-wrapper {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                column-gap: 1rem;
                border: #eae9ee solid;
                border-radius: 11px;
                padding: 1.5rem;
                font-size: 1rem;
            }
        }
    }
}
</style>