<template>
    <div>
        <p>
            {{ pieceId }}
        </p>
        <div>
            <div v-for="variant in variants" :key="variant.colorNo">

                <div>
                    color no : {{ variant.colorNo }}
                </div>
                <div>
                    min requiremnt : {{ variant.minRequirement }}
                </div>

            </div>

        </div>
    </div>
</template>

<script>

export default {
    props: {
        pieceId: String,
        variants: Array
    }
}
</script>