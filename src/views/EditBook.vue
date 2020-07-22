<template>
    <div>

        <div class="text-right" v-if="isEditMode">
            <button class="btn btn-success"
                    @click.stop="onSave">
                Сохранить
            </button>
            <button class="btn btn-danger"
                    @click.stop="onDelete">
                Удалить
            </button>
            <button class="btn btn-warning"
                    @click.stop="onCancel">
                Отмена
            </button>
        </div>

       <!-- <div class="form-row mb-2">
            <label for="author" class="col-sm-2 col-form-label">Автор</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="author"
                       :readonly="!isEditMode"
                       v-model="defaultParams.author" />
            </div>
        </div>-->

        <div class="form-row mb-2">
            <label for="author" class="col-sm-2 col-form-label">Автор</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="author"
                       :readonly="!isEditMode"
                       v-model="defaultParams.author" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="title" class="col-sm-2 col-form-label">Название</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="title"
                       :readonly="!isEditMode"
                       v-model="defaultParams.title" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="weight" class="col-sm-2 col-form-label">Вес в упаковке</label>
            <div class="col-sm-10">
                <input type="number" class="form-control col-3" id="weight"
                       :readonly="!isEditMode"
                       v-model="defaultParams.weight" />
                <span>грамм</span>
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="length" class="col-sm-2 col-form-label">Размер (ДхШхВ)</label>
            <div class="col-sm-10">
                <input type="number" class="form-control col-2" id="length"
                       :readonly="!isEditMode"
                       placeholder="Длина"
                       v-model="defaultParams.size.length" />

                <input type="number" class="form-control col-2"
                       :readonly="!isEditMode"
                       placeholder="Ширина"
                       v-model="defaultParams.size.width" />

                <input type="number" class="form-control col-2"
                       :readonly="!isEditMode"
                       placeholder="Высота"
                       v-model="defaultParams.size.height" />

                <span>мм</span>
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="formatEdition" class="col-sm-2 col-form-label">Формат издания</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="formatEdition"
                       :readonly="!isEditMode"
                       v-model="defaultParams.formatEdition" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="ISBN" class="col-sm-2 col-form-label">ISBN</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="ISBN"
                       :readonly="!isEditMode"
                       v-model="defaultParams.ISBN" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="vendorCode" class="col-sm-2 col-form-label">Артикул</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="vendorCode"
                       :readonly="!isEditMode"
                       v-model="defaultParams.vendorCode" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="numberOfPages" class="col-sm-2 col-form-label">Количество страниц</label>
            <div class="col-sm-10">
                <input type="number" class="form-control col-3" id="numberOfPages"
                       :readonly="!isEditMode"
                       v-model="defaultParams.numberOfPages" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="coverType" class="col-sm-2 col-form-label">Тип обложки</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="coverType"
                       :readonly="!isEditMode"
                       v-model="defaultParams.coverType" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="paperType" class="col-sm-2 col-form-label">Тип бумаги</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="paperType"
                       :readonly="!isEditMode"
                       v-model="defaultParams.paperType" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="authorOnTheCover" class="col-sm-2 col-form-label">Автор на обложке</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="authorOnTheCover"
                       :readonly="!isEditMode"
                       v-model="defaultParams.authorOnTheCover" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="publishingHouse" class="col-sm-2 col-form-label">Издательство</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="publishingHouse"
                       :readonly="!isEditMode"
                       v-model="defaultParams.publishingHouse" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="yearOfIssue" class="col-sm-2 col-form-label">Год выпуска</label>
            <div class="col-sm-10">
                <input type="number" class="form-control col-3" id="yearOfIssue"
                       :readonly="!isEditMode"
                       v-model="defaultParams.yearOfIssue" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="language" class="col-sm-2 col-form-label">Язык издания</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="language"
                       :readonly="!isEditMode"
                       v-model="defaultParams.language" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="series" class="col-sm-2 col-form-label">Серия</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="series"
                       :readonly="!isEditMode"
                       v-model="defaultParams.series" />
            </div>
        </div>

        <div class="form-row mb-2">
            <label for="description" class="col-sm-2 col-form-label">Описание</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="description"
                       :readonly="!isEditMode"
                       v-model="defaultParams.description">
                </textarea>
            </div>
        </div>

    </div>
</template>

<script>
    import fb from 'firebase';

    export default {
        name: "Edit",

        props: {
            isEditMode: {
                type: Boolean,
                default: true
            },

            bookPapams: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                isEditForm: this.isEditMode,

                defaultParams: {
                    title: '',
                    author: '',
                    weight: 0,
                    size: {
                        length: 0,
                        width: 0,
                        height: 0
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
                }
            }
        },

        methods: {
            onSave() {
                this.isEditForm = !this.isEditForm;

                fb.firestore().collection('catalog').add(this.defaultParams)
                    .then(() => alert('сохранено'))
                    .catch(() => alert('ошибка'))
            },

            onDelete() {

            },

            onCancel() {

            }
        }
    }
</script>

<style scoped>

</style>