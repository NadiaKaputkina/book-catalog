<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr class="row">
                    <th class="col" v-for="col of tableColumns" :key="col.settingId">{{col.text}}</th>
                    <th class="col-1"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="row" v-for="book of books" :key="book.title"
                    @click="viewBook(book.index, book.bookId)">
                    <td class="col" v-for="col of tableColumns" :key="book.title + '_' + col.settingId">
                        {{book[col.settingId]}}
                    </td>
                    <td class="col-1">
                        <button class="btn btn-info"
                              @click.stop="editBook(book.index, book.bookId)">
                            /
                        </button>
                    </td>
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
            },

            tableColumns: {
                type: Array,
                default: () => []
            },
        },

        methods: {
            viewBook(bookIndex, bookId) {
                console.log(bookIndex, bookId);
                this.$router.push(`/list/${bookIndex}`);
            },

            editBook(bookIndex, bookId) {
                console.log(bookIndex, bookId);
                this.$router.push({path: `/list/${bookIndex}/edit`});
            }
        }
    }
</script>

<style scoped>

</style>