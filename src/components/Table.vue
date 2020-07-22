<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr class="row">
                    <th class="col">Автор</th>
                    <th class="col">Название</th>
                    <th class="col">Количество страниц</th>
                    <th class="col">Издательство</th>
                    <th class="col">Год выпуска</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row" v-for="(book, index) of books" :key="book.title"
                    @click="showBookParams(index)">
                    <td class="col">{{book.author}}</td>
                    <td class="col">{{book.title}}</td>
                    <td class="col">{{book.numberOfPages}}</td>
                    <td class="col">{{book.publishingHouse}}</td>
                    <td class="col">{{book.yearOfIssue}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="row"></tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Table",

        props: {
            books: {
                type: Array,
                default: () => []
            }
        },

        methods: {
            showBookParams(index) {
                this.$router.push(`/list/${index}`);
            }
        }
    }
</script>

<style scoped>

</style>