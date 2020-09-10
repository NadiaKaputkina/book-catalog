<template>
    <div>
        <modal v-if="isLoading">
            <spinner></spinner>
        </modal>

        <div class="my-3 mx-0 mx-sm-1 mx-md-2 mx-lg-3" v-else>
            <filtering
                :filter-fields="filterFields"
                @searchParams="setSearchParams"
            ></filtering>

            <Table ref='table'
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
  import store from '../store'

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

              searchParams: {}
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
              let searchValues = Object.entries(vm.searchParams);

              if (searchValues.length == 0) {
                  return vm.booksList;
              } else {
                  return vm.booksList.filter((book) => {
                      return searchValues.every(([prop, searchValue]) => {
                          let bookParam = book[prop]

                          if (typeof bookParam == 'string') {
                              console.log(bookParam)
                                  bookParam = bookParam.toLowerCase()
                                  searchValue = searchValue.toLowerCase()

                                  return bookParam.includes(searchValue)
                          }
                    
                        return bookParam == searchValue
                    
                      })
                  })
              }
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
                      this.booksList = Object.assign([], this.booksList, res);

                      this.booksList.forEach((book, index) => {
                          book.index = index + 1;
                      });

                      store.commit('setCurrentBookId', this.booksList[0].id)

                      this.isLoading = false;
                  })
          },

          setSearchParams(value) {
              this.searchParams = {...value}
          },
      },


  }
</script>

<style scoped>

</style>
