<template>
    <div>

        <div class="modal" v-if="isLoading">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div class="text-right" v-else>
            <div class="">
                <button class="btn btn-success"
                        v-if="isEditMode"
                        :disabled="isBtnDisabled"
                        @click.stop="onSave">
                    Сохранить
                </button>
                <button class="btn btn-warning"
                        v-if="isEditMode"
                        @click.stop="onCancel">
                    Отмена
                </button>
                
                <button class="btn btn-info"
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
                    <tr class="row" v-for="setting of settings" :key="setting.settingId">
                        <td class="col-4">
                            <input type="text" v-if="isEditMode"
                                   class="form-control"
                                   v-model="setting.text"/>
                            <p v-else class="text-left px-3 py-2 mb-0">{{setting.text}}</p>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isPublic"
                                   @change="changeChecked($event, setting.settingId, 'isPublic')"
                                   :disabled="!isEditMode"/>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isShowInTable"
                                   @change="changeChecked($event, setting.settingId, 'isShowInTable')"
                                   :disabled="!isEditMode || !setting.isPublic"/>
                        </td>
                        <td class="col-2 text-center">
                            <input type="checkbox"
                                   :checked="setting.isFilterable"
                                   @change="changeChecked($event, setting.settingId, 'isFilterable')"
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
    import fb from 'firebase';

    export default {
        name: "Settings",

        props: {
            isAdmin: {
                type: Boolean,
                default: false
            }
        },

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
                console.log(`this.changedSettingId=`, this.changedSettingId);
                return this.changedSettingId.length == 0;
            }
        },

        methods: {
            getData() {
                this.isLoading = true;

                fb.firestore().collection('settings').get()
                    .then((querySnapshot) => {

                        querySnapshot.forEach((doc) => {
                            const data = doc.data();

                            this.settings.push(data);
                        });

                        this.settings.sort((a, b) => {
                            return a.index - b.index;
                        });

                        this.startSettings = [...this.settings];
                        this.isLoading = false;
                    })
                    .catch(() => console.log('ошибка загрузки настроек'))
            },

            changeChecked(event, settingId, propName) {
                const isChecked = event.target.checked;
                const index = this.settings.findIndex((el) => el.settingId === settingId);

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
                this.settings = [];

                this.startSettings.forEach(setting => {
                    return this.settings.push(setting);
                });

                this.isEditMode = false;
            },

            onSave() {
                if (this.changedSettingId.length) {
                    let batch = fb.firestore().batch();

                    this.changedSettingId.forEach((settingId) => {
                        let ref = fb.firestore().collection('settings').doc(settingId);
                        let value = this.settings.find((el) => el.settingId === settingId);

                        batch.set(ref, value)
                    });

                    batch.commit()
                        .then(() => {
                            console.log('настройки сохранены');
                            this.changedSettingId = [];
                            this.isEditMode = false;
                        })
                        .catch(() => console.log('ошибка'))
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
</style>