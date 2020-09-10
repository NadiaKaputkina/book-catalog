<template>
    <div>

        <div class="modal" v-if="isLoading">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div v-else>
            <div class="text-right my-3">
                <span v-if="!isEditMode" @click="onEdit">
                    <i class="fas fa-edit"></i>
                </span>
                <button class="btn btn-outline-secondary mr-2"
                        v-if="isEditMode"
                        :disabled="isBtnDisabled"
                        @click="onSave">
                    <i class="fas fa-save"></i>
                    <span class="d-none d-sm-inline ml-2">Сохранить</span>
                </button>
                <button class="btn btn-outline-secondary mr-2"
                        v-if="isEditMode"
                        @click="onCancel">
                    <i class="fas fa-times"></i>
                    <span class="d-none d-sm-inline ml-2">Отмена</span>
                </button>
            </div>

            <div class="row">
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-lx-2">Свойство</div>
                <div class="col-1">Публичное</div>
                <div class="col-1">В таблице</div>
                <div class="col-1">В фильтре</div>
            </div>
    
            <div class="row mb-1" v-for="setting of settings" :key="setting.id">
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-lx-2">
                    <input type="text" v-if="isEditMode"
                            class="form-control"
                            v-model="setting.text"/>
                    <p v-else class="text-left px-3 py-2 mb-0">{{setting.text}}</p>
                </div>
                <div class="col-1 text-center">
                    <input type="checkbox"
                            :checked="setting.isPublic"
                            @change="changeChecked($event, setting.id, 'isPublic')"
                            :disabled="!isEditMode"/>
                </div>
                <div class="col-1 text-center">
                    <input type="checkbox"
                            :checked="setting.isShowInTable"
                            @change="changeChecked($event, setting.id, 'isShowInTable')"
                            :disabled="!isEditMode || !setting.isPublic"/>
                </div>
                <div class="col-1 text-center">
                    <input type="checkbox"
                            :checked="setting.isFilterable"
                            @change="changeChecked($event, setting.id, 'isFilterable')"
                            :disabled="!isEditMode || !setting.isShowInTable"/>
                </div>
            </div>
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