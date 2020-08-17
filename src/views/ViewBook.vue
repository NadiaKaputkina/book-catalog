<template>
    <div>

        <modal v-if="isLoading">
            <spinner text="загрузка"></spinner>
        </modal>

        <div class="row" v-else>
            <div class="col-sm-6" @click="showFullImgModal">
                <img :src="getUrl(bookParams.coverImg)"
                     :alt="getName(bookParams.coverImg)"
                     class="img-fluid"/>

                <div>
                    <img v-for="img of bookParams.images"
                         :width="'25%'"
                         :key="getUrl(img)"
                         :src="getUrl(img)"
                         :alt="getName(img)"/>
                </div>

            </div>

            <modal v-if="isShowAllImg">
                <a class="carousel-control-prev" @click="showImage(-1)">
                    <span class="carousel-control-prev-icon"></span>
                </a>

                <div class="d-flex align-items-center flex-column">
                    <button class="btn bg-transparent border-light text-white mb-3" @click="closeModal">
                        Закрыть
                    </button>

                    <img class="rounded mx-auto d-block"
                        :src="getUrl(listImages[currentImgIndex])"
                         :alt="getName(listImages[currentImgIndex])"/>
                </div>

                <a class="carousel-control-next" @click="showImage(1)">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </modal>

            <div class="col-sm-6">

                <div class="text-right">
                    <font-awesome-icon icon="file-pdf" size='2x' @click="exportToPDF"/>
                    <font-awesome-icon icon="edit" size='2x' v-if="isAdmin" @click="onEdit"/>
                </div>

                <h4>{{bookParams.author}}</h4>
                <h2>{{bookParams.title}}</h2>

                <table class="table table-bordered table-sm">
                    <tbody>
                        <tr v-if="isPublic('weight')">
                            <td>Вес в упаковке</td>
                            <td>{{bookParams.weight}}</td>
                        </tr>
                        <tr v-if="isPublic('size')">
                            <td>Размер (ДхШхВ)</td>
                            <td>{{bookParams.size.l}}x{{bookParams.size.w}}x{{bookParams.size.h}} мм</td>
                        </tr>
                        <tr v-if="isPublic('formatEdition')">
                            <td>Формат издания</td>
                            <td>{{bookParams.formatEdition}}</td>
                        </tr>
                        <tr v-if="isPublic('ISBN')">
                            <td>ISBN</td>
                            <td>{{bookParams.ISBN}}</td>
                        </tr>
                        <tr v-if="isPublic('vendorCode')">
                            <td>Артикул</td>
                            <td>{{bookParams.vendorCode}}</td>
                        </tr>
                        <tr v-if="isPublic('numberOfPages')">
                            <td>Количество страниц</td>
                            <td>{{bookParams.numberOfPages}}</td>
                        </tr>
                        <tr v-if="isPublic('coverType')">
                            <td>Тип обложки</td>
                            <td>{{bookParams.coverType}}</td>
                        </tr>
                        <tr v-if="isPublic('paperType')">
                            <td>Тип бумаги</td>
                            <td>{{bookParams.paperType}}</td>
                        </tr>
                        <tr v-if="isPublic('authorOnTheCover')">
                            <td>Автор на обложке</td>
                            <td>{{bookParams.authorOnTheCover}}</td>
                        </tr>
                        <tr v-if="isPublic('publishingHouse')">
                            <td>Издательство</td>
                            <td>{{bookParams.publishingHouse}}</td>
                        </tr>
                        <tr v-if="isPublic('yearOfIssue')">
                            <td>Год выпуска</td>
                            <td>{{bookParams.yearOfIssue}}</td>
                        </tr>
                        <tr v-if="isPublic('language')">
                            <td>Язык издания</td>
                            <td>{{bookParams.language}}</td>
                        </tr>
                        <tr v-if="isPublic('series')">
                            <td>Серия</td>
                            <td>{{bookParams.series}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col" v-if="isPublic('description')">
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
                isShowAllImg: false,

                bookParams: {},

                publicFields: [],

                listImages: [],
                currentImgIndex: -1
            }
        },

        computed: {
            isPublic: (vm) => {
                return (value) => {
                    return vm.publicFields.includes(value);
                }
            },

            getUrl: () => {
                return (value) => {
                    if(!value) {
                        return '@/assets/logo.png'
                    }
                    return value.url;
                }
            },

            getName: () => {
                return (value) => {
                    if (!value) {
                        return ''
                    }
                    return value.name;
                }
            }
        },

        mounted() {
            this.getBookParams();
            this.getPublicFields();
        },

        methods: {
            getBookParams() {
                this.isLoading = true;

                /*getDataFromDB('settings', 'isPublic', '==', true)
                    .then((res) => {
                        res.forEach((setting) =>
                            this.publicFields.push(setting.id)
                        );

                        this.isLoading = false;
                    });
*/
              //  const bookIndex = +this.$route.params.id;

                const id = this.$store.state.currentBookId;

                if (!id) {
                    this.$router.push('/list')
                } else {
                    getDataFromDB('catalog', 'id', '==', id)
                        .then((res) => {
                            this.bookParams = Object.assign({}, this.bookParams, res[0]);

                            this.isLoading = false;
                        })
                }
            },

            getPublicFields() {
                let settings = this.$store.state.settings;

                if (settings.length !== 0) {
                    settings.forEach(setting => {
                        if (setting.isPublic) {
                            return this.publicFields.push(setting.id)
                        }
                    });
                }
            },

            exportToPDF() {

            },

            onEdit() {
                this.$router.push(this.$route.path + '/edit')
            },

            showFullImgModal() {
                this.listImages = [this.bookParams.coverImg, ...this.bookParams.images];

                if (this.listImages.length > 0) {
                    this.isShowAllImg = true;
                    this.currentImgIndex = 0;
                }
            },

            showImage(trigger) {
                const lenght = this.listImages.length;

                if (trigger > 0) {
                    this.currentImgIndex = (this.currentImgIndex !== lenght - 1) ? this.currentImgIndex + 1 : 0;
                } else {
                    this.currentImgIndex = (this.currentImgIndex !== 0) ? this.currentImgIndex - 1 : lenght - 1;
                }
            },

            closeModal() {
                this.isShowAllImg = false;
            }
        }

    }
</script>

<style scoped>
    .custom-modal > div {
        max-width: 90%;
        max-height: 90%;
    }

    .custom-modal > div > img {
        width: auto;
        height: auto;
    }
</style>