<template>
    <div class="p-3">

        <modal v-if="isLoading">
            <spinner text="загрузка"></spinner>
        </modal>

        <div class="row" v-else>
            <div class="col-md-6 col-lx-4 p-0"
                 @click="showFullImgModal">
                <div id="bookImages" class="row">
                    <img :src="getUrl(bookParams.coverImg)"
                         :alt="getName(bookParams.coverImg)"
                         class="col-8 img-fluid"/>

                    <div class="col-4 col-md-4 pl-0">
                        <img v-for="img of bookParams.images"
                             :width="'100%'"
                             :key="getUrl(img)"
                             :src="getUrl(img)"
                             :alt="getName(img)"/>
                    </div>
                </div>
            </div>

            <modal v-if="isShowAllImg">
                <div class="d-flex align-items-center flex-column">
                    <a class="carousel-control-prev" @click="showImage(-1)">
                        <span class="carousel-control-prev-icon"></span>
                    </a>

                    <button class="btn bg-transparent text-white my-3" @click="closeModal">
                        Закрыть
                    </button>

                    <img class="rounded mx-auto d-block"
                        :src="getUrl(listImages[currentImgIndex])"
                        :alt="getName(listImages[currentImgIndex])"/>

                    <a class="carousel-control-next" @click="showImage(1)">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
            </modal>

            <div class="col-md-6 pr-0">

                <div class="row m-0">
                    <h3 id="bookTitle" class="col p-0">{{bookParams.title}}</h3>
                    <div>
                        <span v-if="isAdmin"
                              class="ml-auto mr-2"
                              @click="editBook">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span @click="openPDF(bookParams.title, listImages)">
                            <i class="fas fa-file-pdf"></i>
                        </span>
                    </div>
                </div>

                <h4 id="bookAuthor">{{bookParams.author}}</h4>

                <table id="bookTable" class="table table-bordered table-sm">
                    <tbody>
                        <tr v-if="isPublic('weight')" class="bookDescription">
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


        </div>
        <div id="bookDescription" class="row" v-if="isPublic('description')">
            {{bookParams.description}}
        </div>

    </div>    
</template>

<script>
    import { getDataFromDB } from "../js/db.js";
    import { createPDF } from "../js/pdf.js";
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
                        return '@/assets/noimg.jpg'
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
                            this.listImages = [this.bookParams.coverImg, ...this.bookParams.images];
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

            openPDF(fileName, listImages) {
                createPDF(fileName, listImages)
            },

            editBook() {
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
        width: 100%;
        height: 100%;
    }

    .custom-modal > div > img {
        width: auto;
        max-height: 80vh;
    }
</style>