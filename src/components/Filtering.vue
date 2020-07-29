<template>
    <div class="row flex-nowrap mb-2 justify-content-center">
        <input class="form-control m-1"
               :class="'col-' + colSize"
               v-for="field of filterFields"
               :key="field.id"
               :type="inputType(field.id)"
               :ref="field.id"
               :placeholder="field.text"
               @input="searchBooks(field.id, $event)"
        />
    </div>
</template>

<script>
    import { INPUT_TYPE_NUMBER } from '../js/constants.js'

    export default {
        name: 'Filtering',

        props: {
            filterFields: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        computed: {
            inputType: () => {
                return (settingId) => {
                    return INPUT_TYPE_NUMBER.includes(settingId) ? 'number' : 'text';
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

                this.$emit('searchBooks', settingId, value)
            }
        }
    }
</script>

<style scoped>
</style>
