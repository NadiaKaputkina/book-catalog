<template>
    <div class="catalog">
        <Filtering
            :filter-fields="filterFields"
            @searchBooks="searchBooksByValue"
        ></Filtering>

        <Table
            :books="filteredBooksList"
            :table-columns="tableColumns"
        ></Table>
    </div>
</template>

<script>

  import Filtering from '@/components/Filtering.vue'
  import Table from '@/components/Table.vue'

  import fb from 'firebase';

  export default {
      name: 'List',

      components: {
          Filtering,
          Table
      },

      data() {
          return {
              booksList: [],
              allSettings: [],

              tableColumns: [],
              filterFields: [],

              filterParams: {}
          }
      },

      computed: {
          filteredBooksList: function () {
              console.log(this.filterParams);

              return this.booksList;
          }
      },

      created() {
          fb.firestore().collection('catalog').onSnapshot(snapshot => {

              snapshot.docChanges().forEach( change => {
                  const book = change.doc.data();

                  if (change.type === 'added') {
                      //console.log('[book added]', change.doc.id);
                      this.booksList.push(book)
                  }
                  if (change.type === 'modified') {
                      console.log('[book modified]', change.doc.id)
                      //this.booksList.push(book)
                  }
                  if (change.type === 'deleted') {
                      console.log('[book deleted]', change.doc.id)
                      //this.booksList.push(book)
                  }
              })
          });

          fb.firestore().collection('settings')
              .onSnapshot(snapshot => {
                  snapshot.docChanges().forEach( change => {
                      const setting = change.doc.data();

                      if (change.type === 'added') {
                         // console.log('[setting added]', change.doc.id)
                          this.allSettings.push(setting)
                      }
                      if (change.type === 'modified') {
                          console.log('[setting modified]', change.doc.id)
                      }
                      if (change.type === 'deleted') {
                          console.log('[setting deleted]', change.doc.id)
                      }
                  });

                  this.getTableColumns();
                  this.getFilterFields();
              })
      },

      methods: {
          getTableColumns() {
              this.allSettings.forEach(setting => {
                  if (setting.isShowInTable) {
                      return this.tableColumns.push(setting)
                  }
              });

              this.sortByIndex(this.tableColumns)
          },

          getFilterFields() {
              this.allSettings.forEach(setting => {
                  if (setting.isFilterable) {
                      return this.filterFields.push(setting)
                  }
              });

              this.sortByIndex(this.filterFields)
          },

          sortByIndex(value) {
              value.sort((a, b) => {
                  return a.index - b.index;
              });
          },

          searchBooksByValue(settingId, value) {
              this.$set(this.filterParams, settingId, value);
          }
      },


  }
</script>

<style scoped>

</style>
