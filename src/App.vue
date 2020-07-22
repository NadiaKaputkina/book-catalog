<template>
    <div id="app">

        <header class="card-header">
            <div id="nav text-left">
              <router-link to="/list">Каталог</router-link>  |
              <router-link to="/settings">Настройка</router-link>  |
              <router-link to="/new">Добавить</router-link>  |
            </div>

            <div class="text-right">
                <button class="btn btn-info"
                        @click="exportCatalogToPDF">
                    Экспорт в PDF
                </button>
                <button class="btn btn-info"
                        @click="changeMode">
                    {{ isAdmin ? 'Выход' : 'Админ' }}
                </button>
            </div>
        </header>

        <main class="card-body container">
          <router-view/>
        </main>

        <footer class="card-footer">

        </footer>

    </div>
</template>

<script>
  export default {
      data() {
          return {
              isAdmin: false,
          }
      },

      methods: {
          changeMode() {
              this.isAdmin = !this.isAdmin;
          },

          exportCatalogToPDF() {
              console.log('exportCatalogToPDF')
          }
      }
  }
</script>
<style>

</style>
