<template>
    <div>

        <div class="modal" v-if="isLoading">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div class="text-right" v-else>
            <div class="">
                <button class="btn btn-success m-1"
                        v-if="isEditMode"
                        :disabled="isBtnDisabled"
                        @click.stop="onSave">
                    Сохранить
                </button>
                <button class="btn btn-warning m-1"
                        v-if="isEditMode"
                        @click.stop="onCancel">
                    Отмена
                </button>
                
                <button class="btn btn-info m-1"
                        v-if="!isEditMode"
                        @click="onEdit">
                    Редактировать
                </button>
            </div>

            <table class="table table-hover">
                <thead>
                    <tr class="row">
                        <th class="col-4 text-center">Название свойства</th>
                        <th class="col-2 text-center">Публичное</th>
                        <th class="col-2 text-center">В таблице</th>
                        <th class="col-2 text-center">В фильтре</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row" v-for="setting of settings" :key="setting.id">
                        <td class="col-4">
                            <input type="text" v-if="isEditMode"
                                   class="form-control"
                                   v-model="setting.text"/>
                            <p v-else class="text-left px-3 py-2 mb-0">{{setting.text}}</p>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isPublic"
                                   @change="changeChecked($event, setting.id, 'isPublic')"
                                   :disabled="!isEditMode"/>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isShowInTable"
                                   @change="changeChecked($event, setting.id, 'isShowInTable')"
                                   :disabled="!isEditMode || !setting.isPublic"/>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isFilterable"
                                   @change="changeChecked($event, setting.id, 'isFilterable')"
                                   :disabled="!isEditMode || !setting.isShowInTable"/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="row">
                        <td class="col">+</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        
    </div>
</template>

<script>
    import { getAllDataFromDB, addDocsToDB } from '../js/db.js';
    import mixin from '../js/mixins.js';

    export default {
        name: "Settings",

        mixins: [mixin],

        data() {
            return {
                isLoading: false,
                isEditMode: false,

                settings: [],
                startSettings: [],

                changedSettingId: [],
            }
        },
        
        mounted() {
            this.getData();
        },

        computed: {
            isBtnDisabled: function () {
                return this.changedSettingId.length == 0;
            }
        },

        methods: {
            getData() {
                this.isLoading = true;

                getAllDataFromDB('settings')
                    .then((result) => {
                        this.settings = [...result];

                        this.sortByIndex(this.settings);

                        this.startSettings = JSON.parse(JSON.stringify(this.settings));
                        this.isLoading = false;
                    })
            },

            changeChecked(event, settingId, propName) {
                const isChecked = event.target.checked;
                const index = this.settings.findIndex((el) => el.id === settingId);

                if (isChecked) {
                    this.settings[index][propName] = isChecked;
                } else {
                    switch (propName) {
                        case 'isPublic':
                            this.settings[index].isPublic = isChecked;
                            this.settings[index].isShowInTable = isChecked;
                            this.settings[index].isFilterable = isChecked;
                            break;

                        case 'isShowInTable':
                            this.settings[index].isShowInTable = isChecked;
                            this.settings[index].isFilterable = isChecked;
                            break;

                        case 'isFilterable':
                            this.settings[index].isFilterable = isChecked;
                    }
                }

                this.getChangedSettingId(settingId);
            },

            getChangedSettingId(settingId) {
                const index = this.changedSettingId.findIndex((el) => el === settingId);

                if (index < 0) {
                    this.changedSettingId.push(settingId);
                }
            },

            onEdit() {
                this.isEditMode = true;
            },

            onCancel() {
                this.settings = JSON.parse(JSON.stringify(this.startSettings));

                this.isEditMode = false;
            },

            onSave() {
                if (this.changedSettingId.length) {
                    let arr = this.settings.filter((setting) => {
                        return this.changedSettingId.includes(setting.id)
                    });

                    addDocsToDB('settings', arr)
                        .then(() => {
                            this.changedSettingId = [];
                            this.isEditMode = false;
                        });

                } else {
                    this.isEditMode = false;
                }
            },

        }
    }
</script>

<style scoped>
    .table td {
        padding: 0;
    }

    input[type="checkbox"] {
        background-color: #da2225;
    }
</style>