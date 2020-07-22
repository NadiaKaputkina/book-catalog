<template>
    <div>

        <div v-if="isLoadSettings">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div class="text-right" v-if="!isLoadSettings">
            <div class="">
                <button class="btn btn-success"
                        v-if="isEditMode"
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

            <div class="form-row">
                <div class="col-4">
                    <p class="text-center">Название свойства</p>
                </div>
                <div class="col-2">
                    <p class="text-center">Публичное</p>
                </div>
                <div class="col-2">
                    <p class="text-center">В таблице</p>
                </div>
                <div class="col-2">
                    <p class="text-center">В фильтре</p>
                </div>
            </div>

            <div class="form-row border-bottom" v-for="setting of settings" :key="setting.id">
                <input type="text" class="form-control col-4"
                       :readonly="!isEditMode"
                       v-model="setting.text" />
                <input type="checkbox" class="checkbox col-2"
                       :checked="setting.isPublic"
                       @change="changeChecked($event, setting.id, 'isPublic')"
                       :disabled="!isEditMode"/>
                <input type="checkbox" class="checkbox col-2"
                       :checked="setting.isShowInTable"
                       @change="changeChecked($event, setting.id, 'isShowInTable')"
                       :disabled="!isEditMode || !setting.isPublic"/>
                <input type="checkbox" class="checkbox col-2"
                       :checked="setting.isFilterable"
                       @change="changeChecked($event, setting.id, 'isFilterable')"
                       :disabled="!isEditMode || !setting.isShowInTable"/>
            </div>
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
                isLoadSettings: false,
                isEditMode: false,

                settings: [],
                startSettings: [],

                changedSettingId: [],
            }
        },
        
        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                this.isLoadSettings = true;

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
                        this.isLoadSettings = false;
                    })
                    .catch(() => console.log('ошибка загрузки настроек'))
            },

            changeChecked(event, id, propName) {
                const isChecked = event.target.checked;
                const index = this.settings.findIndex((el) => el.id === id);

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

                this.getChangedSettingId(id, isChecked);
            },

            getChangedSettingId(id, isChecked) {
                const index = this.changedSettingId.findIndex((el) => el.id === id);

                if (index < 0 && isChecked) {
                    this.changedSettingId.push(id);
                }

                if (index >= 0 && !isChecked) {
                    this.changedSettingId.splice(index, 1);
                }
            },

            onEdit() {
                this.isEditMode = true;
            },

            onCancel() {
                this.settings = [];

                this.startSettings.forEach(setting => {
                    this.settings.push(setting);
                });

                this.isEditMode = false;
            },

            onSave() {
                if (this.changedSettingId.length) {
                    let batch = fb.firestore().batch();

                    this.changedSettingId.forEach((id) => {
                        let ref = fb.firestore().collection('settings').doc(id);
                        let value = this.settings.find((el) => el.id === id);

                        batch.set(ref, value)
                    });

                    batch.commit()
                        .then(() => {
                            console.log('настройки сохранены');
                            this.changedSettingId = [];
                            this.isEditMode = false;
                        })
                        .catch(() => console.log('ошибка'))
                }
            },

        }
    }
</script>

<style scoped>

</style>