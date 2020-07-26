<template>
    <div class="row flex-nowrap mb-2 justify-content-center">
        <input class="form-control m-1"
               :class="'col-' + colSize"
               v-for="field of filterFields"
               :key="field.settingId"
               :type="inputType(field.settingId)"
               :ref="field.settingId"
               :placeholder="field.text"
               @input="searchBooks(field.settingId, $event)"
        />
    </div>
</template>

<script>
    import { searchInputTypeNumber } from '@/config/constants.js'

    export default {
        name: 'Filtering',

        props: {
            filterFields: {
                type: Array,
                default: () => []
            }
        },

        computed: {
            inputType: () => {
                return (settingId) => {
                    return searchInputTypeNumber.includes(settingId) ? 'number' : 'text';
                }
            },

            colSize: function () {
                const fieldsCount = this.filterFields.length;
                return Math.floor(12 / fieldsCount);
            }
        },

        methods: {
            searchBooks(settingId, event) {
                const value = event.target.value;

                if (value.length > 2) {
                    this.$emit('searchBooks', settingId, value)
                }
            }
        }
    }
</script>

<style scoped>
</style>
