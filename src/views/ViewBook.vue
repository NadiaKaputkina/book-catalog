<template>
    <div>
        <div class="spinner-border" v-if="isLoading">
            <p>Loading...</p>
        </div>

        <div class="row" v-else>
            <div class="col-sm-4">
                <img :src="bookParams.coverImg.url"
                     :alt="bookParams.coverImg.name"
                     class="img-thumbnail"/>

                <div>
                    <img src=""/>
                </div>
            </div>

            <div class="col-sm-8">

                <div class="text-right">
                    <button class="btn btn-success m-1"
                            @click="exportToPDF">
                        PDF
                    </button>

                    <button class="btn btn-info m-1"
                            v-if="isAdmin"
                            @click="onEdit">
                        Редактировать
                    </button>
                </div>

                <h3>{{bookParams.author}}</h3>
                <h3>{{bookParams.title}}</h3>

                <table class="table table-sm">
                    <tbody>
                        <tr>
                            <td>Вес в упаковке</td>
                            <td>{{bookParams.weight}}</td>
                        </tr>
                        <tr>
                            <td>Размер (ДхШхВ)</td>
                            <td>{{bookParams.size.l}}x{{bookParams.size.w}}x{{bookParams.size.h}} мм</td>
                        </tr>
                        <tr>
                            <td>Формат издания</td>
                            <td>{{bookParams.formatEdition}}</td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>{{bookParams.ISBN}}</td>
                        </tr>
                        <tr>
                            <td>Артикул</td>
                            <td>{{bookParams.vendorCode}}</td>
                        </tr>
                        <tr>
                            <td>Количество страниц</td>
                            <td>{{bookParams.numberOfPages}}</td>
                        </tr>
                        <tr>
                            <td>Тип обложки</td>
                            <td>{{bookParams.coverType}}</td>
                        </tr>
                        <tr>
                            <td>Тип бумаги</td>
                            <td>{{bookParams.paperType}}</td>
                        </tr>
                        <tr>
                            <td>Автор на обложке</td>
                            <td>{{bookParams.authorOnTheCover}}</td>
                        </tr>
                        <tr>
                            <td>Издательство</td>
                            <td>{{bookParams.publishingHouse}}</td>
                        </tr>
                        <tr>
                            <td>Год выпуска</td>
                            <td>{{bookParams.yearOfIssue}}</td>
                        </tr>
                        <tr>
                            <td>Язык издания</td>
                            <td>{{bookParams.language}}</td>
                        </tr>
                        <tr>
                            <td>Серия</td>
                            <td>{{bookParams.series}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col">
                {{bookParams.description}}
            </div>
        </div>

    </div>    
</template>

<script>
    import { getDataFromDB } from "../js/db.js";
    import mixin from '../js/mixins.js';

    export default {
        name: "ViewBook",

        mixins: [mixin],

        data() {
            return {
                isLoading: false,

                bookParams: {},
                isPublicParams: [],
            }
        },

        mounted() {
            this.getBookParams();
        },

        methods: {
            getBookParams() {
                this.isLoading = true;

                const bookIndex = +this.$route.params.id;

                getDataFromDB('settings', 'isPublic', '==', true)
                    .then((res) => {

                        this.sortByIndex(res);

                        res.forEach((setting) =>
                            this.isPublicParams.push({
                                id: setting.id,
                                text: setting.text
                            })
                        );

                        this.isLoading = false;
                    });

                getDataFromDB('catalog', 'index', '==', bookIndex)
                    .then((res) => {
                        this.bookParams = Object.assign({}, this.bookParams, res[0]);
                        this.isLoading = false;
                    })

            },

            exportToPDF() {

            },

            onEdit() {
                this.$router.push(this.$route.path + '/edit')
            }
        }

    }
</script>

<style scoped>

</style>