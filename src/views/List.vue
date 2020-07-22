<template>
    <div class="catalog">
        <Filtering :filter-fields="filterFields"
        ></Filtering>

        <Table :books="booksList"
               :columns="tableColumns"
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

              tableColumns: [],
              filterFields: [],

          }
      },

      created() {
          fb.firestore().collection('catalog').onSnapshot(snapshot => {

              snapshot.docChanges().forEach( change => {
                  const book = change.doc.data();

                  if (change.type === 'added') {
                      this.booksList.push(book)
                  }
              })
          });

          fb.firestore().collection('settings').onSnapshot(snapshot => {

              snapshot.docChanges().forEach( change => {
                  const setting = change.doc.data();

                  if (change.type === 'added') {
                      console.log(change.doc.id, setting)
                  }
                  if (change.type === 'modified') {
                      console.log(setting)
                  }
              })
          })
      },


  }
</script>

<style scoped>

</style>
