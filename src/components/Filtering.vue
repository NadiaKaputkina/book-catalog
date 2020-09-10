<template>
    <div class="row mb-2 px-3">
        <input class="col form-control m-1"
               v-for="field of filterFields"
               :key="field.id"
               :type="inputType(field.id)"
               :ref="field.id"
               :placeholder="field.text"
               @input="onSetSearchParams(field.id, $event)"
        />

         <button class="btn"
            @click="onSearch">
            <i class="fas fa-search"></i>
         </button>
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
