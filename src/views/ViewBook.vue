<template>
    <div>

        <modal v-if="isLoading">
            <spinner text="загрузка"></spinner>
        </modal>

        <div class="row" v-else>
            <div class="col-sm-4">
                <img :src="bookParams.coverImg.url"
                     :alt="bookParams.coverImg.name"
                     class="img-thumbnail"
                     @click="showFullImgModal"/>
                <div>
                    <img src=""/>
                </div>
            </div>

            <modal v-if="isShowFullImg">
                <button>
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <img :src="bookParams.coverImg.url"
                     :alt="bookParams.coverImg.name"
                width="100vw"/>
                <button>
                    <span class="carousel-control-next-icon"></span>
                </button>
            </modal>

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

                <h4>{{bookParams.author}}</h4>
                <h2>{{bookParams.title}}</h2>

                <table class="table table-bordered table-sm">
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
    import Spinner from '../components/Spinner.vue';
    import Modal from '../components/Modal.vue';

    export default {
        name: "ViewBook",

        mixins: [mixin],

        components: {
            'spinner': Spinner,
            'modal': Modal
        },

        data() {
            return {
                isLoading: false,
                isShowFullImg: false,

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
            },

            showFullImgModal() {
                this.isShowFullImg = true;
            }
        }

    }
</script>

<style scoped>

</style>