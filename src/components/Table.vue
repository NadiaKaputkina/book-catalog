<template>
    <div class="table">
        <div class="row m-0 p-3" v-for="book of books" :key="book.title">
            <div class="col-4 col-sm-3 col-md-2 p-0">
                <img class="img-thumbnail" :src="book.coverImg.url"/>
            </div>
            <div class="col-8 col-sm-9 col-md-10 pr-0">
                <div class="row m-0">
                    <h4 class="col p-0" @click="viewBook(book.index, book.id)">{{book.title}}</h4>
                    <div class="">
                        <span v-if="isAdmin"
                              class="ml-auto mr-2"
                              @click="editBook(book.index, book.id)">
                            <i class="icon-pdf"></i>
                        </span>
                        <span class=""
                            @click="openPDF(book.id)">
                            <i class="icon-edit"></i>
                        </span>
                    </div>
                </div>
                <div class="row m-0">
                    <p>{{book.author}}, {{book.yearOfIssue}}</p>
                </div>
                <div class="row m-0">
                    <p class="overflow-hidden">{{book.description}}</p>
                </div>
            </div>
        </div>

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