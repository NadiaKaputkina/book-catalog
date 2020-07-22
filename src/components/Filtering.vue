<template>
    <div>
        <h1>Filter {{row}}</h1>
    </div>
</template>

<script>
  export default {
      name: 'Filtering',

      props: {
          row: {
              type: String,
              default: ''
          }
      }
  }
</script>

<style scoped>

</style>
