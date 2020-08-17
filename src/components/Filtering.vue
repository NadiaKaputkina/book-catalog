<template>
    <div class="row flex-nowrap mb-2 justify-content-center">
        <input class="form-control m-1"
               :class="'col-' + colSize(field.id)"
               v-for="field of filterFields"
               :key="field.id"
               :type="inputType(field.id)"
               :ref="field.id"
               :placeholder="field.text"
               @input="onSetSearchParams(field.id, $event)"
        />

         <span @click="onSearch">
            <font-awesome-icon icon="search" size='2x' />
        </span>
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

        data() {
            return {
                searchParams: {}
            }
        },

        computed: {
            inputType: () => {
                return (settingId) => {
                    return INPUT_TYPE_NUMBER.includes(settingId) ? 'number' : 'search';
                }
            },

            colSize: () => {
                return (settingId) => {
                    if (INPUT_TYPE_NUMBER.includes(settingId)) {
                        return 1;
                    } else {
                        //const fieldsCount = this.filterFields.length;

                        return 2;
                    }
                }
            }
        },

        methods: {
            onSearch() {
                this.$emit('searchParams', this.searchParams)
            },

            onSetSearchParams(settingId, event) {
                const value = event.target.value;

                this.$set(this.searchParams, settingId, value);
            }
        }
    }
</script>

<style scoped>
</style>
