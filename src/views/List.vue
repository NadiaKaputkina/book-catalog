<template>
    <div>
        <modal v-if="isLoading">
            <spinner></spinner>
        </modal>

        <div v-else>
            <div class="text-right">
                <button class="btn btn-success m-1"
                        @click="exportToPDF">
                    PDF
                </button>
            </div>

            <filtering
                :filter-fields="filterFields"
                @searchBooks="searchBooksByValue"
            ></filtering>

            <Table
                :isAdmin="isAdmin"
                :books="filteredBooksList"
                :table-columns="tableColumns"
            ></Table>
        </div>
    </div>
</template>

<script>
  import Filtering from '../components/Filtering.vue'
  import Table from '../components/Table.vue'
  import Modal from '../components/Modal.vue'
  import Spinner from '../components/Spinner.vue';

  import mixin from '../js/mixins.js'
  import { getAllDataFromDB } from '../js/db.js'

  export default {
      name: 'List',

      mixins: [mixin],

      components: {
          'filtering': Filtering,
          'Table': Table,
          'spinner': Spinner,
          'modal': Modal
      },

      data() {
          return {
              isLoading: false,

              booksList: [],

              filterParams: {}
          }
      },

      computed: {
          tableColumns: (vm) => {
              let columns = [];
              let settings = vm.$store.state.settings;

              if (settings.length !== 0) {
                  settings.forEach(setting => {
                      if (setting.isShowInTable) {
                          return columns.push(setting)
                      }
                  });

                  vm.sortByIndex(columns);
              }

              return columns;
          },

          filterFields: (vm) => {
              let fields = [];
              let settings = vm.$store.state.settings;

              if (settings.length !== 0) {
                  settings.forEach(setting => {
                      if (setting.isFilterable) {
                          return fields.push(setting)
                      }
                  });

                  vm.sortByIndex(fields);
              }

              return fields;
          },

          filteredBooksList: (vm) => {
              /* let filteredList = [];

              let settingValue = Object.entries(vm.filterParams);

                  return vm.booksList;
              } else {
                  settingValue.forEach((param) => {
                      filteredList.
                  })
              }*/

              return vm.booksList
          }
      },

      created() {
          this.getData();
      },

      methods: {
          getData() {
              this.isLoading = true;

              getAllDataFromDB('catalog')
                  .then((res) => {
                      this.booksList = Object.assign([], this.booksList, res)

                      this.isLoading = false;
                  })
          },

          searchBooksByValue(settingId, value) {
              this.$set(this.filterParams, settingId, value);
          },

          exportToPDF() {

          }
      },


  }
</script>

<style scoped>

</style>
