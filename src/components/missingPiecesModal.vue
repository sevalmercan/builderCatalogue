<template>
    <div>
        <div v-for="otherUser in otherUserInfo" :key="otherUser.user">
            <div>
                {{ otherUser.user }}
                {{ otherUser.count }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        otherUserInfo: Array
    }

}

</script>