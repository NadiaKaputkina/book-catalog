<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr class="row">
                    <th>#</th>
                    <th class="col" v-for="col of tableColumns" :key="col.id">{{col.text}}</th>
                    <th class="col-1" v-if="isAdmin"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="row" v-for="book of books" :key="book.title"
                    @click="viewBook(book.index, book.id)">
                    <th>{{book.index}}</th>
                    <td class="col" v-for="col of tableColumns" :key="book.title + '_' + col.id">
                        {{book[col.id]}}
                    </td>
                    <td class="col-1" v-if="isAdmin">
                         <div @click.stop="editBook(book.index, book.id)">
                            <font-awesome-icon icon="edit" size='2x'/>
                        </div>
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
    import store from '../store';

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
            setCurrentBookId(id) {
                store.commit('setCurrentBookId', id)
            },

            viewBook(index, id) {
                this.setCurrentBookId(id);

                this.$router.push(`/list/${index}`);
            },

            editBook(index, id) {
                this.setCurrentBookId(id);

                this.$router.push(`/list/${index}/edit`);
            }
        }
    }
</script>

<style scoped>

</style>