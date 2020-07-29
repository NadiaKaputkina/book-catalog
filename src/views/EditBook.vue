<template>
    <div>

        <spinner v-if="isLoading"></spinner>

        <div v-else>
            <div class="text-right">
                <button class="btn btn-success m-1"
                        @click="onSave">
                    Сохранить
                </button>
                <button class="btn btn-danger m-1"
                        @click="onDelete">
                    Удалить
                </button>
                <button class="btn btn-warning m-1"
                        @click="onCancel">
                    Отмена
                </button>
            </div>

            <div class="form-row mb-2">
                <label for="author" class="col-sm-2 col-form-label">Автор</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="author"
                           v-model="bookParams.author" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="title" class="col-sm-2 col-form-label">Название</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="title"
                           v-model="bookParams.title" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="coverImg" class="col-sm-2 col-form-label">Обложка</label>
                <div class="col-sm-10">
                    <input type="file" accept="image/*" id="coverImg" @change="loadCoverImg"/>
                    <p>{{bookParams.coverImg.name}}</p>
                </div>
            </div>


            <div class="form-row mb-2">
                <label for="imgs" class="col-sm-2 col-form-label">Картинки</label>
                <div class="col-sm-10">
                    <input type="file" accept="image/*" id="imgs" multiple @change="loadImages"/>
                    <div class="">
                        <p v-for="img of bookParams.images" :key="img.name">{{img.name}}</p>
                    </div>
                </div>
            </div>


            <div class="form-row mb-2">
                <label for="weight" class="col-sm-2 col-form-label">Вес в упаковке</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control d-inline col-3 col-md-2" id="weight"
                           v-model="bookParams.weight" />
                    <span>грамм</span>
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="length" class="col-sm-2 col-form-label">Размер (ДхШхВ)</label>
                <div class="col-sm">
                    <input type="number" class="form-control d-inline col-3 col-md-2" id="length"
                           placeholder="Длина"
                           v-model="bookParams.size.l" />

                    <input type="number" class="form-control d-inline col-3 col-md-2"
                           placeholder="Ширина"
                           v-model="bookParams.size.w" />

                    <input type="number" class="form-control d-inline col-3 col-md-2"
                           placeholder="Высота"
                           v-model="bookParams.size.h" />

                    <span>мм</span>
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="formatEdition" class="col-sm-2 col-form-label">Формат издания</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="formatEdition"
                           v-model="bookParams.formatEdition" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="ISBN" class="col-sm-2 col-form-label">ISBN</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="ISBN"
                           v-model="bookParams.ISBN" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="vendorCode" class="col-sm-2 col-form-label">Артикул</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="vendorCode"
                           v-model="bookParams.vendorCode" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="numberOfPages" class="col-sm-2 col-form-label">Количество страниц</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control col-3 col-md-2" id="numberOfPages"
                           v-model="bookParams.numberOfPages" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="coverType" class="col-sm-2 col-form-label">Тип обложки</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="coverType"
                           v-model="bookParams.coverType" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="paperType" class="col-sm-2 col-form-label">Тип бумаги</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="paperType"
                           v-model="bookParams.paperType" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="authorOnTheCover" class="col-sm-2 col-form-label">Автор на обложке</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="authorOnTheCover"
                           v-model="bookParams.authorOnTheCover" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="publishingHouse" class="col-sm-2 col-form-label">Издательство</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="publishingHouse"
                           v-model="bookParams.publishingHouse" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="yearOfIssue" class="col-sm-2 col-form-label">Год выпуска</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control col-3 col-md-2" id="yearOfIssue"
                           v-model="bookParams.yearOfIssue" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="language" class="col-sm-2 col-form-label">Язык издания</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="language"
                           v-model="bookParams.language" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="series" class="col-sm-2 col-form-label">Серия</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="series"
                           v-model="bookParams.series" />
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="description" class="col-sm-2 col-form-label">Описание</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="description"
                           v-model="bookParams.description">
                    </textarea>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { getDataFromDB, updateDocToDB, deleteDocToDB, getNewDocIdFromDB } from '../js/db.js'
    import { uploadImage } from '../js/storage.js';

    import Spinner from '../components/Spinner.vue';

    export default {
        name: "Edit",

        components: {
            'spinner': Spinner
        },

        data() {
            return {
                isLoading: false,

                bookParams: {},

                defaultBookParams: {
                    id: '',
                    title: '',
                    author: '',
                    weight: 0,
                    size: {
                        l: 0,
                        w: 0,
                        h: 0
                    },
                    formatEdition: '',
                    ISBN: '',
                    vendorCode: '',
                    numberOfPages: 0,
                    coverType: '',
                    paperType: '',
                    authorOnTheCover: '',
                    publishingHouse: '',
                    yearOfIssue: 0,
                    language: '',
                    series: '',
                    description: '',
                    coverImg: {
                        name: '',
                        url: ''
                    },
                    images: []
                },
            }
        },

        mounted() {
            this.getBookParams();
        },

        methods: {
            getBookParams() {
                const path = this.$route.path;

                if (path !== '/new') {
                    this.isLoading = true;

                    const bookIndex = +this.$route.params.id;

                    getDataFromDB('catalog', 'index', '==', bookIndex)
                        .then((res) => {
                            this.bookParams = Object.assign({}, this.bookParams, res[0]);
                            this.isLoading = false;
                        })
                } else {
                    this.bookParams = Object.assign({}, this.bookParams, this.defaultBookParams)
                }
            },

            onSave() {
                const path = this.$route.path;

                if (path == '/new') {
                    getNewDocIdFromDB('catalog')
                        .then((res) => {
                            console.log(res);
                            this.bookParams.id = res;
                        });
                }

                updateDocToDB('catalog', this.bookParams.id, this.bookParams)
            },

            onDelete() {
                deleteDocToDB('catalog', this.bookParams.id)
            },

            onCancel() {
                this.$router.go(-1);
            },

            loadCoverImg(event) {
                let coverFile = event.target.files[0];

                uploadImage(this.bookParams.id, coverFile.name, coverFile)
                    .then((url) => {
                        this.bookParams.coverImg = {
                            url: url,
                            name: coverFile.name
                        };
                    })
            },

            loadImages(event) {
                let imageFiles = event.target.files;

                console.log(imageFiles)
            }
        }
    }
</script>

<style scoped>

</style>