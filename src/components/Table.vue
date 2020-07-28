<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr class="row">
                    <th class="col" v-for="col of tableColumns" :key="col.id">{{col.text}}</th>
                    <th class="col-1" v-if="isAdmin"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="row" v-for="book of books" :key="book.title"
                    @click="viewBook(book.index, book.id)">
                    <td class="col" v-for="col of tableColumns" :key="book.title + '_' + col.id">
                        {{book[col.id]}}
                    </td>
                    <td class="col-1" v-if="isAdmin">
                        <button class="btn btn-info"
                              @click.stop="editBook(book.index, book.id)">
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
            isAdmin: {
                type: Boolean,
                default: false
            },

            books: {
                type: Array,
                default: () => {
                    return []
                }
            },

            tableColumns: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },

        methods: {
            viewBook(bookIndex) {
                this.$router.push(`/list/${bookIndex}`);
            },

            editBook(bookIndex) {
                this.$router.push(`/list/${bookIndex}/edit`);
            }
        }
    }
</script>

<style scoped>

</style>