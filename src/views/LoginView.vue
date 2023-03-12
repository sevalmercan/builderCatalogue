<template>
    <div>
        login
        <button @click="redirectToHome()">
            Riderect
        </button>
    </div>
</template>


<script>

export default {
    data() {
        return {
            name: 'emre'
        }
    },
    methods: {


        redirectToHome() {
            this.$router.push({ path: `${this.name}/my-inventory` })
        }
    }

}
</script>