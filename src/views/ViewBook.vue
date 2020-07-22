<template>
    <div>
        <h3>Просмотр</h3>
    </div>
</template>

<script>
    export default {
        name: "View",

        data() {
            return {
                fullParams: {
                    title: '',
                    author: '',
                    weight: 0,
                    size: {
                        length: 0,
                        width: 0,
                        height: 0
                    },
                    formatEdition: '',
                    ISBN: '',
                    vendorCode: '',
                    numberOfPages: 0,
                    coverType: '',
                    paperType: '',
                    authorOnTheCover: '',
                    publishingHouse: '',
                    yearOfIssue: 0,
                    language: '',
                    series: '',
                    description: '',
                },
            }
        }
    }
</script>

<style scoped>

</style>