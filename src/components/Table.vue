<template>
    <div class="table">
        <div class="bookrow m-0 p-3" v-for="book of books" :key="book.title">
            <div class="col-4 col-sm-3 col-md-2 p-0">
                <img class="bookImage img-thumbnail" :src="book.coverImg.url"/>
            </div>
            <div class="col-8 col-sm-9 col-md-10 pr-0">
                <div class="row m-0">
                    <h4 class="bookTitle col p-0" @click="viewBook(book.index, book.id)">{{book.title}}</h4>
                    <div class="ml-auto">
                        <span v-if="isAdmin"
                              class="mr-2"
                              @click="editBook(book.index, book.id)">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span class=""
                            @click="openPDF(book)">
                            <i class="fas fa-file-pdf"></i>
                        </span>
                    </div>
                </div>
                <div class="row m-0">
                    <p>{{book.author}}, {{book.yearOfIssue}}</p>
                </div>
                <div class="row m-0 overflow-hidden bookDescription h-50">
                    {{partText(book.description)}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import store from '../store';
    import { createPDF } from '../js/pdf.js'

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

        computed: {
            partText: () => {
                return (text) => {
                    return text
                }
            }
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
            },

            openPDF(bookData) {
                 createPDF(bookData)
            },
        }
    }
</script>