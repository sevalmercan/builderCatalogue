<template>
    <div class="login">
        <div class="layout">
            <div class="description">Please select a user below to move forward </div>
            <div class="usernames">
                <div v-for="user in users" :key="user.username" class="user-wrapper" @click="redirectToHome(user.username)">
                    <div class="username-container">
                        <div class="icon-container">
                            <b-icon class="nav-icon" pack="fas" icon="fas fa-user" size="is-small"> </b-icon>
                        </div>
                        <div>
                            <p class="username-title">User</p>
                            <p> {{ getName(user.username) }}</p>
                        </div>

                    </div>
                    <div class="info-container">
                        <div class="info-wrapper">
                            <b-icon class="nav-icon" pack="fas" icon="fal fa-puzzle-piece" size="is-small">
                            </b-icon>
                            <p> {{ user.brickCount }} pieces</p>
                        </div>

                        <div class="info-wrapper">
                            <b-icon class="nav-icon" pack="fas" icon="far fa-street-view" size="is-small">
                            </b-icon>
                            <p> {{ user.location }}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import bricksMixin from '@/common/bricksMixin.vue'
export default {
    mixins: [bricksMixin],
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
            this.$router.push({ name: `my-inventory`, params: { username } })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/color.scss';

::v-deep .icon.is-small {
    font-size: 0.9rem;
}


.login {
    overflow-y: auto;
    height: 100%;

    .layout {
        margin: 30px 50px;
        overflow: hidden;
        background: $main-page-bg;
        border-radius: 50px;

        .description {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.1rem;
            padding-top: 3rem;
            color: #6c6a6a;
        }

        .usernames {
            display: flex;
            justify-content: center;
            column-gap: 1.1rem;
            padding: 2rem 1rem;
            margin-bottom: 1rem;
            row-gap: 1.1rem;
            flex-wrap: wrap;

            .user-wrapper {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                column-gap: 1rem;
                border: #eae9ee solid;
                border-radius: 11px;
                padding: 1.5rem;
                font-size: 0.95rem;
                row-gap: 1rem;
                width: 230px;

                &:hover {
                    box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
                }


                .username-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    column-gap: 1rem;

                    .icon-container {
                        display: flex;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: #d2d2e0de;
                        justify-content: center;
                        align-items: center;

                    }

                    .username-title {
                        font-size: 0.6rem;
                        color: #0b0a0aad;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                }

                .info-container {
                    display: flex;
                    flex-direction: column;
                    row-gap: 0.5rem;

                    .info-wrapper {
                        display: flex;
                        column-gap: 1rem;
                        font-size: 0.8rem;
                        align-items: center;
                    }
                }


            }
        }
    }
}
</style>