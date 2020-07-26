<template>
    <div>
        <h3>{{}}</h3>
    </div>
</template>

<script>
    export default {
        name: "ViewBook",

        props: {
            bookParams: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },

        data() {
            return {

            }
        },

        mounted() {
            this.getBookImages();
        },

        methods: {
            getBookImages() {

            }
        }

    }
</script>

<style scoped>

</style>