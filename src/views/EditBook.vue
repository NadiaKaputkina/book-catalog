<template>
    <div>
        <modal v-if="isLoading">
            <spinner text="загрузка"></spinner>
        </modal>

        <modal v-else-if="isSaving">
            <spinner text="сохранение"></spinner>
        </modal>

        <modal v-else-if="isDeleting">
            <div class="bg-white">
                <p>Удалить все данные и картинки для этой книги?</p>
                <button class="btn btn-success"
                        @click="onDelete">Да</button>
                <button class="btn btn-warning"
                        @click="isDeleting = false">Нет</button>
            </div>
        </modal>

        <div v-else>
            <div class="text-right my-3">
                <button class="btn btn-outline-secondary mr-2"
                        @click="onSave">
                    <i class="fas fa-save"></i>
                    <span class="d-none d-sm-inline ml-2">Сохранить</span>
                </button>
                <button class="btn btn-outline-secondary mr-2"
                        @click="isDeleting = true">
                    <i class="far fa-trash-alt"></i>
                    <span class="d-none d-sm-inline ml-2">Удалить</span>
                </button>
                <button class="btn btn-outline-secondary mr-2"
                        @click="onCancel">
                    <i class="fas fa-times"></i>
                    <span class="d-none d-sm-inline ml-2">Отмена</span>
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
                    <p>{{getName(bookParams.coverImg)}}</p>
                </div>
            </div>


            <div class="form-row mb-2">
                <label for="imgs" class="col-sm-2 col-form-label">Картинки</label>
                <div class="col-sm-10">
                    <input type="file" accept="image/*" id="imgs" multiple @change="loadImages"/>

                    <div v-for="(img, index) of bookParams.images" :key="img.name">
                        {{img.name}}
                        <span class="text-danger" @click="deleteImage(index, img.name)">
                            <i class="fas fa-close"></i>
                        </span>
                    </div>
                </div>
            </div>


            <div class="form-row mb-2">
                <label for="weight" class="col-sm-2 col-form-label">Вес в упаковке</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control d-inline col-3 col-md-2" id="weight"
                           v-model="bookParams.weight" />
                    <span class="ml-2">грамм</span>
                </div>
            </div>

            <div class="form-row mb-2">
                <label for="length" class="col-sm-2 col-form-label">Размер (ДхШхВ)</label>
                <div class="col-sm">
                    <input type="number" class="form-control d-inline col-3 col-md-2" id="length"
                           placeholder="Длина"
                           v-model="bookParams.size.l" />

                    <input type="number" class="form-control d-inline col-3 col-md-2 ml-2"
                           placeholder="Ширина"
                           v-model="bookParams.size.w" />

                    <input type="number" class="form-control d-inline col-3 col-md-2 ml-2"
                           placeholder="Высота"
                           v-model="bookParams.size.h" />

                    <span class="ml-2">мм</span>
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
    import { getDataFromDB, updateDocToDB, deleteDocToDB, getNewDocIdFromDB, addDocToDB } from '../js/db.js'
    import { uploadImage, deleteImage } from '../js/storage.js';

    import Spinner from '../components/Spinner.vue';
    import Modal from '../components/Modal.vue';
    import mixin from '../js/mixins.js'

    export default {
        name: "Edit",

        mixins: [mixin],

        components: {
            'spinner': Spinner,
            'modal': Modal
        },

        data() {
            return {
                isLoading: false,
                isSaving: false,
                isDeleting: false,

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

                coverFile: null,
                files: [],

                deletedFiles: [],
            }
        },

        mounted() {
            this.getBookParams();
        },

        computed: {
            getName: () => {
                return (value) => {
                    if (!value) {
                        return ''
                    }
                    return value.name;
                }
            }
        },

        methods: {
            async getBookParams() {
                const path = this.$route.path;

                if (path !== '/new') {
                    this.isLoading = true;

                    getDataFromDB('catalog', 'id', '==', this.currentBookId)
                        .then((res) => {
                            this.bookParams = Object.assign({}, this.bookParams, res[0]);

                            this.isLoading = false;
                        })
                } else {
                    this.bookParams = Object.assign({}, this.bookParams, this.defaultBookParams)

                    this.bookParams.id = await getNewDocIdFromDB('catalog');
                }
            },

            async onSave() {
                this.isSaving = true;

                const path = this.$route.path;

                if (this.deletedFiles.length !== 0) {
                    for (let file of this.deletedFiles) {
                        await deleteImage(this.bookParams.id, file.name)
                            .then(() => {
                                this.bookParams.images.splice(file.index, 1)
                            })
                    }
                }

                if (this.coverFile !== null) {
                    this.bookParams.coverImg = {
                        url: await uploadImage(this.bookParams.id, this.coverFile.name, this.coverFile),
                        name: this.coverFile.name
                    };
                }

                if(this.files.length !== 0) {
                    for (let file of this.files) {
                        console.log(file)
                        this.bookParams.images.push({
                            url: await uploadImage(this.bookParams.id, file.name, file),
                            name: file.name
                        });
                    }
                }

                if (path == '/new') {
                    await addDocToDB('catalog', this.bookParams.id, this.bookParams);

                    this.clear();
                    this.isSaving = false;

                    this.$router.push('/list/' + this.$route.params.id)
                } else {
                    await updateDocToDB('catalog', this.bookParams.id, this.bookParams);

                    this.clear();
                    this.isSaving = false;

                    this.$router.push('/list/' + this.$route.params.id)
                }
            },

            onDelete() {
                deleteDocToDB('catalog', this.bookParams.id);

                deleteImage(this.bookParams.id, 'all')
                    .then(() => {
                        this.$router.push('/list')

                        this.isDeleting = false
                    })
            },

            onCancel() {
                this.$router.go(-1);
            },

            loadCoverImg(event) {
                this.coverFile = event.target.files[0];
            },

            loadImages(event) {
                let imageFiles = event.target.files;

                imageFiles.forEach(file => {
                    this.files.push(file)
                })
            },

            deleteImage(index, fileName) {
                const path = this.$route.path;

                if (path == '/new') {
                    this.files.splice(index, 1)
                } else {
                    this.deletedFiles.push({
                        index: index,
                        name: fileName
                    });
                }
            },

            clear() {
                this.files = [];
                this.coverFile = null;
                this.deletedFiles = [];
            }
        }
    }
</script>

<style scoped>

</style>